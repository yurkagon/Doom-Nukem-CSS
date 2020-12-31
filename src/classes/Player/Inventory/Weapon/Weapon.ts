import { Distance } from "helpers";
import _ from "lodash";
import { observable } from "mobx";
import sleep from "utils/sleep";

import Scene from "classes/Scene";
import Enemy from "classes/Sprite/Enemy";
import Player from "classes/Player";

import Sound from "sound";

import { WeaponType } from "./types";

abstract class Weapon {
  public abstract readonly name: WeaponType;
  @observable public isShooting: boolean = false;

  protected abstract readonly timePerShot: number = 0;

  private readonly maxShootableFov: number = 30;

  protected abstract readonly sound: Sound;

  public async shot(): Promise<void> {
    if (this.isShooting) return;

    const enemies = this.getPotentiallyShootableEnemies();

    this.isShooting = true;
    this.shootingStrategy(enemies);

    this.playSound();

    await sleep(this.timePerShot);
    this.isShooting = false;
  }

  protected shootingStrategy(enemies: Enemy[]): void {
    enemies.some(enemy => {
      if (this.isEnemyInShootingAngle(enemy)) {
        enemy.setState(Enemy.states.DEAD);

        return true;
      }
    });
  }

  protected getShootingAngle(distanceToTarget: number): number {
    if (distanceToTarget > 3000) return 5;
    if (distanceToTarget > 2000) return 10;
    if (distanceToTarget > 1000) return 20;
    if (distanceToTarget > 500) return 25;
    if (distanceToTarget > 200) return 30;

    return this.maxShootableFov;
  }

  protected isEnemyInShootingAngle(enemy: Enemy): boolean {
    const player = Player.getInstance();

    const playerPosition = player.getPosition();
    const enemyPosition = enemy.getPosition();
    const distance = Distance(playerPosition, enemyPosition);

    const fov = this.getShootingAngle(distance);
    const isEnemyInShootingAngle = player.isObjectVisibleFromFov(enemy, fov);

    return isEnemyInShootingAngle;
  }

  private playSound(): void {
    this.sound.play();
  }

  private getPotentiallyShootableEnemies(): Enemy[] {
    const player = Player.getInstance();
    const scene = Scene.getInstance();

    const enemies = _.chain(scene.gameObjects)
      .filter(gameObject => {
        const isEnemy = gameObject instanceof Enemy;
        if (!isEnemy) return;

        const enemy = gameObject as Enemy;

        const isDead = enemy.currentState === Enemy.states.DEAD;
        if (isDead) return;

        if (!enemy.active()) return;

        const isVisibleInFov = player.isObjectVisibleFromFov(
          enemy,
          this.maxShootableFov
        );

        if (!isVisibleInFov) return;

        return true;
      })
      .sortBy((enemy: Enemy) => enemy.getDistanceToPlayer())
      .value() as Enemy[];

    return enemies;
  }
}

export default Weapon;

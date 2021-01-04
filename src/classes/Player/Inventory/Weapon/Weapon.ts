import { Distance } from "helpers";
import _ from "lodash";
import { observable } from "mobx";
import sleep from "utils/sleep";

import State from "state";
import Scene from "classes/Scene";
import Enemy, { EnemyState } from "classes/Enemy";
import Player from "classes/Player";

import Sound from "sound";

import { WeaponType } from "./types";

abstract class Weapon {
  public abstract readonly name: WeaponType;
  public abstract readonly timePerShot: number;
  public abstract readonly maxBulletCount: number;

  protected abstract readonly sound: Sound;

  @observable public bulletCount: number = 0;
  @observable public isShooting: boolean = false;

  private readonly maxShootableFov: number = 30;
  protected added: boolean = false;

  public async shot(): Promise<void> {
    if (this.isShooting) return;
    if (this.bulletCount <= 0 && !State.settings.infinite_ammo) return;

    const enemies = this.getPotentiallyShootableEnemies();

    this.isShooting = true;

    this.shootingStrategy(enemies);
    this.playSound();

    if (!State.settings.infinite_ammo) {
      this.bulletCount = this.bulletCount - 1;
    }

    await sleep(this.timePerShot);

    this.isShooting = false;
  }

  public addBullets(count: number): boolean {
    if (this.bulletCount === this.maxBulletCount) return false;

    const newCount = this.bulletCount + count;

    this.bulletCount =
      newCount < this.maxBulletCount ? newCount : this.maxBulletCount;

    return true;
  }

  public setAsAdded(): void {
    this.added = true;
  }

  public isAdded(): boolean {
    return State.settings.infinite_ammo || this.added;
  }

  protected shootingStrategy(enemies: Enemy[]): void {
    enemies.some(enemy => {
      if (this.isEnemyInShootingAngle(enemy)) {
        enemy.setState(EnemyState.dead);

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

  protected playSound(): void {
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

        const isDead = enemy.currentState === EnemyState.dead;
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

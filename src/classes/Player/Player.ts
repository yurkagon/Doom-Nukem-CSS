import { observable, action } from "mobx";
import Angle from "helpers/angle";

import Scene from "../Scene";
import Enemy from "../Sprite/Enemy";

import PlayerController from "./PlayerController";
import { Distance } from "helpers";

class Player extends PlayerController {
  @observable public hp = 40;

  private constructor() {
    super();
  }

  @action
  public addHP(value: number) {
    const godMode = true;

    if (godMode) return;
    let result = this.hp + value;

    if (result > 100) {
      result = 100;
    } else if (result < 0) {
      result = 0;
    }

    this.hp = result;

    if (this.hp <= 0) this.onDie();
  }

  update() {
    if (this.hp <= 0 && this.position.y >= -100) this.position.y -= 2;
    // this.onShot();
    super.update();
  }

  protected onShot() {
    if (!this.allowMovement) return;

    const maxShootableFov = 30;

    const enemies = Scene.getInstance().gameObjects.filter(gameObject => {
      const isEnemy = gameObject instanceof Enemy;
      if (!isEnemy) return;

      const enemy = gameObject as Enemy;

      const isDead = enemy.currentState === Enemy.states.DEAD;
      if (isDead) return;

      if (!enemy.active()) return;

      const isVisibleInFov = this.isObjectVisibleFromFov(
        enemy,
        maxShootableFov
      );

      if (!isVisibleInFov) return;

      return true;
    }) as Enemy[];

    enemies.some(enemy => {
      const playerPosition = this.getPosition();
      const enemyPosition = enemy.getPosition();
      const distance = Distance(playerPosition, enemyPosition);

      const fov = (() => {
        if (distance > 3000) return 5;
        if (distance > 2000) return 10;
        if (distance > 1000) return 20;
        if (distance > 500) return 25;
        if (distance > 200) return maxShootableFov;

        return 35;
      })();

      const isVisibleInFow = this.isObjectVisibleFromFov(enemy, fov);

      if (isVisibleInFow) {
        enemy.setState(Enemy.states.DEAD);

        return true;
      }
    });
  }

  private onDie() {
    this.allowMovement = false;
  }

  private static instance: Player;
  public static getInstance(): Player {
    if (Player.instance) {
      return Player.instance;
    } else {
      Player.instance = new Player();

      return Player.instance;
    }
  }
}

export default Player;

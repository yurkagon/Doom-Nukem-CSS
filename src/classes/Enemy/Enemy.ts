import Scene from "classes/Scene";
import Player from "classes/Player";
import Item from "classes/Item";
import State from "State";

import { Distance, generateCoordinateNoiseValue, chance } from "helpers";

import Sprite from "../Sprite";

import { EnemyState, EnemyConfig } from "./types";

import "./style.scss";

abstract class Enemy extends Sprite {
  public currentState: EnemyState = EnemyState.default;

  protected readonly speed: number = 8;
  protected readonly logicChangeInterval: number = 500;
  protected readonly visionDistance: number = 2500;
  protected readonly maxWalkingToPlayerDistance: number = 3100;
  protected readonly attackDistance: number = 1000;

  private timer: NodeJS.Timeout = null;
  private moveDiff: Position = null;

  protected readonly chanceToDrop: number = 0.1;
  protected readonly itemToDrop: { new (position: Position): Item };

  constructor(config: EnemyConfig) {
    super({
      classType: "enemy",
      type: config.type,
      position: {
        ...config.position,
        y: 200
      }
    });

    this.logicUpdate = this.logicUpdate.bind(this);
  }

  public start() {
    this.moveDiff = generateCoordinateNoiseValue(500);

    this.timer = setInterval(this.logicUpdate, this.logicChangeInterval);

    super.start();
  }

  private logicUpdate() {
    if (!(this.isActive && State.settings.enemy_ai)) return;

    const player = Player.getInstance();

    const distance = Distance(this.getPosition(), player.getPosition());

    switch (this.currentState) {
      case EnemyState.default:
        if (distance <= this.attackDistance) {
          this.setState(EnemyState.attack);
        } else if (distance <= this.visionDistance) {
          this.setState(EnemyState.walk);
        }
        break;
      case EnemyState.walk:
        if (distance <= this.attackDistance) {
          this.setState(EnemyState.attack);
        } else if (distance >= this.maxWalkingToPlayerDistance) {
          this.setState(EnemyState.default);
        }
        break;
      case EnemyState.attack:
        this.setState(EnemyState.walk);
    }

    this.moveDiff = generateCoordinateNoiseValue(500);
  }

  public setState(state: EnemyState) {
    this.spriteElement.removeClass(this.currentState);
    this.spriteElement.addClass(state);
    this.currentState = state;

    switch (this.currentState) {
      case EnemyState.dead:
        clearInterval(this.timer);
        return this.onDie();
      case EnemyState.attack:
        return this.onAttack();
    }
  }

  protected onAttack() {
    const player = Player.getInstance();

    chance(0.3).to(() => {
      const damage = Math.random() * 20;

      player.addHP(-damage);
    });
  }

  protected onDie() {
    if (this.itemToDrop) {
      chance(this.chanceToDrop).to(() => {
        new this.itemToDrop({
          ...this.position
        });
      });
    }
  }

  public update() {
    if (this.isActive && State.settings.enemy_ai) {
      const player = Player.getInstance();

      switch (this.currentState) {
        case EnemyState.walk:
          const playerPos = player.getPosition();
          const enemyPos = this.getPosition();

          const dx = playerPos.x + this.moveDiff.x - enemyPos.x;
          const dz = playerPos.z - this.moveDiff.z - enemyPos.z;
          const angle = Math.atan2(dz, dx);

          const { x, z } = this.position;

          const targetPosition = {
            x: x + Math.cos(angle) * this.speed,
            z: z + Math.sin(angle) * this.speed
          };

          const result = Scene.getInstance().levelMap.handleCollision(
            targetPosition,
            this.position
          );

          this.position.x = result.x;
          this.position.z = result.z;
      }
    }
    super.update();
  }
}

export default Enemy;

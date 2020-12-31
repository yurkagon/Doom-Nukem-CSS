import Player from "classes/Player";
import Settings from "classes/Settings";
import { Distance, generateCoordinateNoiseValue, chance } from "helpers";

import Sprite from "../Sprite";
import ShotgunItem from "../Item/ShotgunItem";

import Scene from "classes/Scene";

import "./style.scss";

class Enemy extends Sprite {
  public currentState = null;

  protected readonly speed: number = 8;

  protected readonly logicChangeInterval: number = 500;

  protected readonly visionDistance: number = 2500;
  protected readonly maxWalkingToPlayerDistance: number = 3100;
  protected readonly attackDistance: number = 1000;

  protected VISIBILITY_DISTANCE = 4000;

  private timer: NodeJS.Timeout = null;
  private moveDiff: Position = null;

  static states = {
    DEFAULT: "default",
    DEAD: "dead",
    WALK: "walk",
    ATTACK: "attack"
  };

  constructor(config) {
    super({
      ...config,
      position: {
        ...config.position,
        y: 200
      },
      classType: "enemy"
    });

    this.logicUpdate = this.logicUpdate.bind(this);
  }

  public start() {
    this.moveDiff = generateCoordinateNoiseValue(500);

    this.setState(Enemy.states.DEFAULT);

    this.timer = setInterval(this.logicUpdate, this.logicChangeInterval);

    super.start();
  }

  private logicUpdate() {
    if (!(this.isActive && Settings.getInstance().enemy_ai)) return;

    const { states } = Enemy;

    const player = Player.getInstance();

    const distance = Distance(this.getPosition(), player.getPosition());

    switch (this.currentState) {
      case states.DEFAULT:
        if (distance <= this.attackDistance) {
          this.setState(states.ATTACK);
        } else if (distance <= this.visionDistance) {
          this.setState(states.WALK);
        }
        break;
      case states.WALK:
        if (distance <= this.attackDistance) {
          this.setState(states.ATTACK);
        } else if (distance >= this.maxWalkingToPlayerDistance) {
          this.setState(states.DEFAULT);
        }
        break;
      case states.ATTACK:
        this.setState(states.WALK);
    }

    this.moveDiff = generateCoordinateNoiseValue(500);
  }

  public setState(state) {
    this.spriteElement.removeClass(this.currentState);
    this.spriteElement.addClass(state);
    this.currentState = state;

    const { states } = Enemy;

    switch (this.currentState) {
      case states.DEAD:
        clearInterval(this.timer);
        return this.onDie();
      case states.ATTACK:
        return this.onAttack();
    }
  }

  protected onAttack() {
    const player = Player.getInstance();

    chance(0.1).to(() => {
      const damage = Math.random() * 10;

      player.addHP(-damage);
    });
  }

  protected onDie() {
    chance(0.1).to(() => {
      new ShotgunItem({
        ...this.position
      });
    });
  }

  public update() {
    if (this.isActive && Settings.getInstance().enemy_ai) {
      const { states } = Enemy;

      const player = Player.getInstance();

      switch (this.currentState) {
        case states.WALK:
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

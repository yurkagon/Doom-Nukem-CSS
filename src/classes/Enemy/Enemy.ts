import Player from "classes/Player";
import { Distance, generateCoordinateNoiseValue, chance } from "helpers";

import Sprite from "../Sprite/Sprite";
import ShotgunItem from "../Sprite/Item/ShotgunItem";

import Scene from "classes/Scene";

import "./style.scss";

class Enemy extends Sprite {
  protected VISIBILITY_DISTANCE = 4000;

  static readonly LOGIC_INTERVAL = 500;
  static readonly VISION_DISTANCE = 2500;
  static readonly MAX_WALKING_TO_PLAYER_DISTANCE = 3100;
  static readonly ATTACK_DISTANCE = 1000;

  static states = {
    DEFAULT: "default",
    DEAD: "dead",
    WALK: "walk",
    ATTACK: "attack"
  };

  currentState = null;
  timer = null;
  distance = null;
  speed = 8;
  moveDiff = null;

  isStatic = false;

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
    this.timer = setInterval(this.logicUpdate, Enemy.LOGIC_INTERVAL);

    super.start();
  }

  private logicUpdate() {
    if (!this.isActive) return;

    const {
      VISION_DISTANCE,
      MAX_WALKING_TO_PLAYER_DISTANCE,
      ATTACK_DISTANCE,
      states
    } = Enemy;

    const player = Player.getInstance();

    this.distance = Distance(this.getPosition(), player.getPosition());
    const { distance } = this;

    switch (this.currentState) {
      case states.DEFAULT:
        if (distance <= ATTACK_DISTANCE) {
          this.setState(states.ATTACK);
        } else if (distance <= VISION_DISTANCE) {
          this.setState(states.WALK);
        }
        break;
      case states.WALK:
        if (distance <= ATTACK_DISTANCE) {
          this.setState(states.ATTACK);
        } else if (distance >= MAX_WALKING_TO_PLAYER_DISTANCE) {
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
    if (this.isActive && !this.isStatic) {
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

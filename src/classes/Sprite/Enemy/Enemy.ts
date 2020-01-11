import Sprite from "../index";
import Player from "../../Player/Player";
import { Distance, generateCoordDiff } from "../../../helpers";
import CollisionDetector from "../../CollisionDetector";

class Enemy extends Sprite {
  static readonly LOGIC_INTERVAL = 500;
  static readonly VISION_DISTANCE = 2500;
  static readonly MAX_WALKING_TO_PLAYER_DISTANCE = 3100;
  static readonly ATACK_DISTANCE = 1000;

  static states = {
    DEFAULT: "default",
    DEAD: "dead",
    WALK: "walk",
    ATACK: "atack"
  };

  currenState = null;
  timer = null;
  distance = null;
  speed = 8;
  moveDiff = null;

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
    this.moveDiff = generateCoordDiff(500);
    this.setState(Enemy.states.DEFAULT);
    this.timer = setInterval(this.logicUpdate, Enemy.LOGIC_INTERVAL);

    super.start();
  }

  private logicUpdate() {
    if (!this.isActive) return;

    const {
      VISION_DISTANCE,
      MAX_WALKING_TO_PLAYER_DISTANCE,
      ATACK_DISTANCE,
      states
    } = Enemy;

    const player = Player.getInstance();

    this.distance = Distance(this.getPosition(), player.getPosition());
    const { distance } = this;

    switch (this.currenState) {
      case states.DEFAULT:
        if (distance <= ATACK_DISTANCE) {
          this.setState(states.ATACK);
        } else if (distance <= VISION_DISTANCE) {
          this.setState(states.WALK);
        }
        break;
      case states.WALK:
        if (distance <= ATACK_DISTANCE) {
          this.setState(states.ATACK);
        } else if (distance >= MAX_WALKING_TO_PLAYER_DISTANCE) {
          this.setState(states.DEFAULT);
        }
        break;
      case states.ATACK:
        // if(distance >= ATACK_DISTANCE) {
        //   this.setState(states.WALK);
        // }
        this.setState(states.WALK);
    }

    this.moveDiff = generateCoordDiff(500);
  }

  public setState(state) {
    this.spriteElement.removeClass(this.currenState);
    this.spriteElement.addClass(state);
    this.currenState = state;
  }

  public update() {
    if (this.isActive) {
      const { states } = Enemy;

      const player = Player.getInstance();

      switch (this.currenState) {
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

          const result = CollisionDetector.checkCollision(
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

import _ from "lodash";

import Enemy from "classes/Sprite/Enemy";

import Weapon from "./Weapon";

import { WeaponType } from "./types";

class Shotgun extends Weapon {
  public readonly name: WeaponType = "shotgun";

  private readonly maxEnemiesPerShot: number = 1000;

  protected readonly timePerShot: number = 2000;

  protected shootingStrategy(enemies: Enemy[]): void {
    _.chain(enemies)
      .chunk(this.maxEnemiesPerShot)
      .head()
      .value()
      ?.forEach(enemy => {
        if (this.isEnemyInShootingAngle(enemy)) {
          enemy.setState(Enemy.states.DEAD);
        }
      });
  }
}

export default Shotgun;

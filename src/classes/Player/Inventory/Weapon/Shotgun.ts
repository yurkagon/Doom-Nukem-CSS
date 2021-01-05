import _ from "lodash";

import Enemy, { EnemyState } from "classes/Enemy";

import Sound from "sound";
import shotgun_shot from "sound/data/weapons/shotgun_shot";

import Weapon from "./Weapon";

import { WeaponType } from "./types";

class Shotgun extends Weapon {
  public readonly name: WeaponType = "shotgun";
  public readonly timePerShot: number = 1000;

  public maxBulletCount: number = 20;
  public bulletCount: number = 0;

  protected readonly sound: Sound = shotgun_shot;

  private readonly maxEnemiesPerShot: number = 1000;

  protected shootingStrategy(enemies: Enemy[]): void {
    _.chain(enemies)
      .chunk(this.maxEnemiesPerShot)
      .head()
      .value()
      ?.forEach(enemy => {
        if (this.isEnemyInShootingAngle(enemy)) {
          enemy.setState(EnemyState.dead);
        }
      });
  }
}

export default Shotgun;

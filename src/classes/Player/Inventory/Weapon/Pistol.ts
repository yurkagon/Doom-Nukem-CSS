import Sound from "classes/Sound";
import pistol_shot from "sounds/weapons/pistol_shot";

import Weapon from "./Weapon";

class Pistol extends Weapon {
  public readonly name = "pistol";
  public readonly timePerShot: number = 500;

  public maxBulletCount: number = 50;
  public bulletCount: number = 15;

  protected added: boolean = true;
  protected readonly sound: Sound = pistol_shot;
}

export default Pistol;

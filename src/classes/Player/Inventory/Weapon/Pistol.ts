import Sound from "sound";
import pistol_shot from "sound/data/weapons/pistol_shot";

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

import { pistol_shot } from "sound/data/weapons/pistol";

import Weapon from "./Weapon";

class Pistol extends Weapon {
  protected sound = pistol_shot;

  public readonly name = "pistol";

  protected readonly timePerShot: number = 500;
}

export default Pistol;

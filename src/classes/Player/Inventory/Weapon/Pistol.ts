import Weapon from "./Weapon";

class Pistol extends Weapon {
  public readonly name = "pistol";

  protected readonly timePerShot: number = 500;
}

export default Pistol;

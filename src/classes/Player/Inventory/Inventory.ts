import Weapon from "./Weapon";
import { WeaponType, WeaponsData } from "./types";

class Inventory {
  private weapons: WeaponsData = {
    pistol: new Weapon(),
    shotgun: new Weapon()
  };
}

export default Inventory;

import { observable, computed, action } from "mobx";

import Weapon, { Pistol, Shotgun, WeaponType } from "./Weapon";
import { WeaponsData } from "./types";

class Inventory {
  private weaponList: WeaponsData = {
    pistol: new Pistol(),
    shotgun: new Shotgun()
  };

  @observable private selectedWeaponKey: WeaponType = "shotgun";

  constructor() {
    document.addEventListener("keydown", this.clickHandler.bind(this));
  }

  @action
  public setWeapon(weaponName: WeaponType) {
    this.selectedWeaponKey = weaponName;
  }

  @computed
  public get weapon(): Weapon {
    return this.getWeaponByType(this.selectedWeaponKey);
  }

  public getWeaponByType(type: WeaponType): Weapon {
    return this.weaponList[type];
  }

  private clickHandler(event: KeyboardEvent) {
    switch (event.key) {
      case "1":
        return this.setWeapon("pistol");
      case "2":
        return this.setWeapon("shotgun");
    }
  }
}

export default Inventory;

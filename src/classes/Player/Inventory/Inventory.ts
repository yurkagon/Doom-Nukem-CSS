import { observable, computed, action } from "mobx";

import sleep from "utils/sleep";

import Weapon, { Pistol, Shotgun, WeaponType } from "./Weapon";

import { WeaponsData } from "./types";

class Inventory {
  private weaponList: WeaponsData = {
    pistol: new Pistol(),
    shotgun: new Shotgun()
  };

  @observable public isChangingWeapon: boolean = false;
  public readonly weaponChangingTime: number = 500;

  @observable private selectedWeaponKey: WeaponType = "pistol";

  constructor() {
    document.addEventListener("keydown", this.clickHandler.bind(this));
  }

  @action
  public async changeWeapon(weaponName: WeaponType) {
    const weaponToSet = this.getWeaponByType(weaponName);

    if (weaponToSet === this.weapon) return;

    this.isChangingWeapon = true;

    const removingWeaponTime = this.weaponChangingTime / 2;
    const gettingNewWeaponTime = this.weaponChangingTime / 2;

    await sleep(removingWeaponTime);
    this.selectedWeaponKey = weaponName;
    await sleep(gettingNewWeaponTime);

    this.isChangingWeapon = false;
  }

  @computed
  public get weapon(): Weapon {
    return this.getWeaponByType(this.selectedWeaponKey);
  }

  public getWeaponByType(type: WeaponType): Weapon {
    return this.weaponList[type];
  }

  private clickHandler(event: KeyboardEvent) {
    if (this.weapon.isShooting) return;

    switch (event.key) {
      case "1":
        return this.changeWeapon("pistol");
      case "2":
        return this.changeWeapon("shotgun");
    }
  }
}

export default Inventory;

import Player from "classes/Player";
import { WeaponType } from "classes/Player/Inventory/Weapon";
import Item from "classes/Item";
import Sound from "classes/Sound";

import weaponPickup from "sounds/items/weaponPickup";

abstract class WeaponItem extends Item {
  protected readonly sound: Sound = weaponPickup;
  protected abstract name: WeaponType;
  protected abstract bulletCount: number;

  protected onPick() {
    const player = Player.getInstance();

    const weapon = player.inventory.getWeaponByType(this.name);

    const result = weapon.addBullets(this.bulletCount);

    if (!weapon.isAdded()) {
      weapon.setAsAdded();
      player.inventory.changeWeapon(this.name);
    }

    if (result) return super.onPick();
  }
}

export default WeaponItem;

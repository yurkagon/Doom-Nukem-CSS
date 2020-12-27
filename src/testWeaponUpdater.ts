import $ from "jquery";

import Player from "./classes/Player/Player";

const player = Player.getInstance();

const weapon = $(".testWeapon");

export default async () => {
  if (player.isMoving()) {
    weapon
      .animate(
        {
          right: "150px",
          bottom: "-80px"
        },
        500
      )
      .animate(
        {
          right: "200px",
          bottom: 0
        },
        200
      );
  } else {
    weapon.stop();
  }
};

import Enemy from "classes/Enemy";

import ShotgunItem from "items/ShotgunItem";

import { Props } from "./types";

import "./style.scss";

class Guard extends Enemy {
  protected itemToDrop = ShotgunItem;

  constructor(props: Props) {
    super({ type: "zombie", ...props });
  }
}

export default Guard;

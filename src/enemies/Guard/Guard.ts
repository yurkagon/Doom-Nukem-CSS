import Enemy from "classes/Enemy";

import PistolItem from "items/PistolItem";

import { Props } from "./types";

import "./style.scss";

class Guard extends Enemy {
  protected itemToDrop = PistolItem;
  protected chanceToDrop: number = 0.33;

  constructor(props: Props) {
    super({ type: "guard", ...props });
  }
}

export default Guard;

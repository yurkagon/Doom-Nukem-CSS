import React, { FC } from "react";
import cn from "classnames";

import getCharClassName from "./getCharClassName";

import { CharProps } from "./types";

const Char: FC<CharProps> = ({ children: char }) => (
  <div className={cn("char", getCharClassName(char))} />
);
export default Char;

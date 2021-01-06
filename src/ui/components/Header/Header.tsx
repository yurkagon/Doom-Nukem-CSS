import React, { FC, memo } from "react";
import cn from "classnames";

import Text from "../Text";

import { Props } from "./types";

import "./style.scss";

const Header: FC<Props> = ({ children: text, className }) => (
  <Text className={cn("header", className)}>{text}</Text>
);

export default memo(Header);

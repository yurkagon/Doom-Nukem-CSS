import React, { FC } from "react";

import { Props } from "./types";

import "./style.scss";

const Screen: FC<Props> = ({ children, className = "", ...props }) => (
  <div className={`screen ${className}`} {...props}>
    {children}
  </div>
);

export default Screen;

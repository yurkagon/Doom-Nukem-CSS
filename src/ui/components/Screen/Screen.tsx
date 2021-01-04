import React, { FC, forwardRef } from "react";

import { Props } from "./types";

import "./style.scss";

const Screen: FC<Props> = ({ children, className = "", ...props }, ref) => (
  <div className={`screen ${className}`} {...props} ref={ref}>
    {children}
  </div>
);

export default forwardRef(Screen);

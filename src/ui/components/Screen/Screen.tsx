import React from "react";

import "./style.scss";

const Screen = ({ children, className = "", ...props }) => (
  <div className={`screen ${className}`} {...props}>
    {children}
  </div>
);

export default Screen;

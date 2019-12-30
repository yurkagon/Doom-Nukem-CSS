import React from "react";

import "./style.scss";

const Screen = ({ children, className = "" }) => (
  <div className={`screen ${className}`}>{children}</div>
);

export default Screen;

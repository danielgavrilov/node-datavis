import React from "react";

const Group = ({ children, transform }) => (
  <g transform={transform}>
    {children}
  </g>
);

export default Group;

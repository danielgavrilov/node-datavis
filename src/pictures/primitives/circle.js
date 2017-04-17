import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "circle";

const variables = {
  x: 0,
  y: 0,
  r: 10,
  fill: "",
  stroke: "",
  "strokeWidth": ""
};

const order = [
  "x", "y", "r",
  "fill", "stroke", "strokeWidth"
];

function draw({ x, y, ...params}, key=0) {
  return (
    <circle key={key} cx={x} cy={y} {...params} />
  )
}

const iconSize = 24;

export const icon = (
  <svg className="icon" width={iconSize} height={iconSize}>
    <circle cx={iconSize / 2} cy={iconSize / 2} r={iconSize / 2} style={{
      fill: "#666"
    }} />
  </svg>
);

export default createPrimitive({ name, variables, order, draw, icon });

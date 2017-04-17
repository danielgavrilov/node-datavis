import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "rect";

const variables = {
  x: 0,
  y: 0,
  height: 20,
  width: 20,
  fill: "",
  stroke: "",
  "strokeWidth": ""
};

const order = [
  "x", "y", "width", "height",
  "fill", "stroke", "strokeWidth"
];

function draw(params, key) {
  return (
    <rect key={key} {...params} />
  )
}

const iconSize = 24;

export const icon = (
  <svg className="icon" width={iconSize} height={iconSize}>
    <rect x="0" y="0" width={iconSize} height={iconSize} style={{
      fill: "#666"
    }} />
  </svg>
);

export default createPrimitive({ name, variables, order, draw, icon });

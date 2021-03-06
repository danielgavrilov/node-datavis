import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "ellipse";

const variables = {
  x: 40,
  y: 40,
  rx: 30,
  ry: 20,
  fill: "rgba(0,0,0,.3)",
  stroke: "",
  "strokeWidth": ""
};

const order = [
  "x", "y", "rx", "ry",
  "fill", "stroke", "strokeWidth"
];

function draw({ x, y, ...params}, key=0) {
  return (
    <ellipse key={key} cx={x} cy={y} {...params} />
  )
}

const iconSize = 24;

export const icon = (
  <svg className="icon" width={iconSize} height={iconSize}>
    <ellipse cx={iconSize / 2} cy={iconSize / 2} rx={iconSize / 2} ry={iconSize / 2.5} style={{
      fill: "#666"
    }} />
  </svg>
);

export default createPrimitive({ name, variables, order, draw, icon });

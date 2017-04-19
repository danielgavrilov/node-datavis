import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "line";

const variables = {
  x1: 10,
  y1: 10,
  x2: 70,
  y2: 60,
  stroke: "rgba(0,0,0,.3)",
  "strokeWidth": "2"
};

const order = [
  "x1", "y1", "x2", "y2",
  "stroke", "strokeWidth"
];

function draw(params, key=0) {
  return (
    <line key={key} {...params} />
  )
}

const iconSize = 24;
const handleSize = 2.5;

export const icon = (
  <svg className="icon" width={iconSize} height={iconSize}>
    <line x1={handleSize} y1={iconSize - handleSize}
          x2={iconSize - handleSize} y2={handleSize}
          stroke="#666" strokeWidth="2" />
    <circle cx={handleSize} cy={iconSize - handleSize} r={handleSize} fill="#666" />
    <circle cx={iconSize - handleSize} cy={handleSize} r={handleSize} fill="#666" />
  </svg>
);

export default createPrimitive({ name, variables, order, draw, icon });

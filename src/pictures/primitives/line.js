import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "line";

const variables = {
  x1: 0,
  y1: 0,
  x2: 10,
  y2: 15,
  stroke: "",
  "strokeWidth": ""
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

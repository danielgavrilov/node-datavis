import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "circle";

const variables = {
  x: 0,
  y: 0,
  r: 10
};

const order = [
  "x", "y", "r"
];

function draw({ x, y, ...params}, key=0) {
  return (
    <circle key={key} cx={x} cy={y} {...params} />
  )
}

export default createPrimitive({ name, variables, order, draw });

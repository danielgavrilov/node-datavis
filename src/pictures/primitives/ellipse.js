import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "ellipse";

const variables = {
  x: 0,
  y: 0,
  rx: 10,
  ry: 15
};

const order = [
  "x", "y", "rx", "ry"
];

function draw({ x, y, ...params}, key=0) {
  return (
    <ellipse key={key} cx={x} cy={y} {...params} />
  )
}

export default createPrimitive({ name, variables, order, draw });

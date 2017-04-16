import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "line";

const variables = {
  x1: 0,
  y1: 0,
  x2: 10,
  y2: 15
};

const order = [
  "x1", "y1", "x2", "y2"
];

function draw(params, key=0) {
  return (
    <line key={key} {...params} />
  )
}

export default createPrimitive({ name, variables, order, draw });

import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "rect";

const variables = {
  x: 0,
  y: 0,
  height: 20,
  width: 20
};

const order = [
  "x", "y", "width", "height"
];

function draw(params, key) {
  return (
    <rect key={key} {...params} />
  )
}

export default createPrimitive({ name, variables, order, draw });

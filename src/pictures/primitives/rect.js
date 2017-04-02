import React from "react";

import createPrimitive from "../../utils/create-primitive";

const variables = {
  x: 0,
  y: 0,
  height: 20,
  width: 20,
  fill: "black"
};

function draw(params, key) {
  return (
    <rect key={key} {...params} />
  )
}

export default createPrimitive({ variables, draw });

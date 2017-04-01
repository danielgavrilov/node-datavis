import React from "react";

import createPrimitive from "../../utils/create-primitive";

const variables = {
  x: 0,
  y: 0,
  height: 20,
  width: 20
};

function draw({ x, y, width, height }) {
  return (
    <rect x={x} y={y} width={width} height={height} />
  )
}

export default createPrimitive({ variables, draw });

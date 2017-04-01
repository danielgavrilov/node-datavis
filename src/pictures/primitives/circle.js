import React from "react";

import createPrimitive from "../../utils/create-primitive";

const variables = {
  cx: 0,
  cy: 0,
  r: 10
};

function draw({ cx, cy, r }) {
  return (
    <circle cx={cx} cy={cy} r={r} />
  )
}

export default createPrimitive({ variables, draw });

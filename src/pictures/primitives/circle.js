import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "circle";

const variables = {
  cx: 0,
  cy: 0,
  r: 10,
  fill: "'red'"
};

function draw(params, key=0) {
  return (
    <circle key={key} {...params} />
  )
}

export default createPrimitive({ name, variables, draw });

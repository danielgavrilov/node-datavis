import _ from "lodash";
import React from "react";

import createPrimitive from "../../utils/create-primitive";

const name = "line";

const variables = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  text: "Text",
  "text-anchor": "start",
  "font-family": "Arial",
  "font-size": "12px",
  "font-weight": "normal",
  "fill": "black"
};

const style = [
  "font-family",
  "font-size",
  "font-weight",
  "text-anchor"
];

const order = [
  "x", "y", "dx", "dy", "fill", "text"
].concat(style);

function draw({ text, ...params}, key=0) {
  const css = _.mapKeys(_.pick(params, style), (value, key) => _.camelCase(key));
  params = _.omit(params, style);
  return (
    <text key={key} style={css} {...params}>
      {text}
    </text>
  )
}

export default createPrimitive({ name, variables, order, draw });

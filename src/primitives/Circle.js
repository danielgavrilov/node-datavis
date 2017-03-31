import React from "react";

export const variables = {
  cx: 0,
  cy: 0,
  r: 10
};

export function draw({ cx, cy, r }) {
  return (
    <circle cx={cx} cy={cy} r={r} />
  )
}

import React from "react";

export const variables = {
  x: 0,
  y: 0,
  height: 20,
  width: 20
};

export function draw({ x, y, width, height }) {
  return (
    <rect x={x} y={y} width={width} height={height} />
  )
}

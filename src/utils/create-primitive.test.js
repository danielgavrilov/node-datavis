import React from "react";

import createPrimitive from "./create-primitive";
import evaluate from "../engine/evaluate";

it("should just work", () => {

  const variables = {
    x: 0,
    y: 0,
    height: 20,
    width: 20,
    fill: "bleh"
  };

  function draw({ x, y, width, height }) {
    return (
      <rect x={x} y={y} width={width} height={height} />
    )
  }

  const picture = createPrimitive({ variables, draw }).picture;

  expect(evaluate(picture)).toBe(0);

});

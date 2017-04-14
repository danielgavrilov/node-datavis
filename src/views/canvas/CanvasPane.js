import React from "react";

import Canvas from "./Canvas";
import PrimitivesPalette from "./PrimitivesPalette";

import "../../css/canvas-pane.css";

const CanvasPane = () => (
  <div className="canvas-pane">
    <PrimitivesPalette />
    <Canvas />
  </div>
);

export default CanvasPane;

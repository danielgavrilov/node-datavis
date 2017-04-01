import React from "react";

import "../../css/canvas-pane.css";

const CanvasPane = () => (
  <div className="canvas-pane">
    <div className="canvas-container">
      <svg className="canvas" width="660" height="290" />
    </div>
  </div>
);

export default CanvasPane;

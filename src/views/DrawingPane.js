import React, { Component } from 'react';

import "../css/drawing-pane.css";

import subpicturesExample from "../examples/subpictures";

class DrawingPane extends Component {
  render() {
    const subpictures = subpicturesExample.map((subpicture) =>
      <div className="subpicture" key={subpicture.name}>
        <span className="subpicture-name">{subpicture.name}</span>
        <span className="subpicture-context {subpicture.context == null : 'global' : ''}">{ subpicture.context || "Global" }</span>
      </div>
    );
    return (
      <div className="drawing-pane">
        <div className="canvas-container">
          <svg className="canvas" width="660" height="290" />
        </div>
        <div className="inspector-container">
          <div className="subpictures">
            {subpictures}
          </div>
          <div className="subpicture-inspector">

          </div>
        </div>
      </div>
    );
  }
}

export default DrawingPane;

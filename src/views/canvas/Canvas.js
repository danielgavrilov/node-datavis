import React from "react";
import { connect } from 'react-redux';

import { specToSVG } from "../../engine/draw";
import currentPicture from "../../utils/current-picture";

const Canvas = ({ svg, width, height }) => (
  <div className="canvas-container">
    <svg className="canvas" width={width} height={height}>
      {svg}
    </svg>
  </div>
);

const mapStateToProps = (state) => {
  const picture = currentPicture(state);
  const pictureSpec = picture.get("__preview");
  const width = pictureSpec.params.width;
  const height = pictureSpec.params.height;
  const svg = specToSVG(pictureSpec);
  return {
    svg,
    width,
    height
  }
}

export default connect(
  mapStateToProps
)(Canvas);

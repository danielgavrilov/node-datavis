import React from "react";

import { specToSVG } from "../../engine/draw";

const Picture = ({ picture, selected, onClick }) => {
  const spec = picture.get("__preview");
  const children = specToSVG(spec);
  const { width, height } = spec.params;
  const className = "picture " + (selected ? "selected" : "");
  return (
    <div className={className} onClick={onClick}>
      <svg height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMax">
        {children}
      </svg>
    </div>
  )
};

export default Picture;

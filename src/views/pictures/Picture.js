import React from "react";

import { specToSVG } from "../../engine/draw";

const Picture = ({
  picture,
  selected,
  onClick,
  onRemove,
  onEmbed
}) => {
  const spec = picture.get("__preview");
  const children = specToSVG(spec);
  const { width, height } = spec.params;
  const className = "picture " + (selected ? "selected" : "");
  return (
    <div className={className} onClick={onClick}>
      <div className="remove-picture show-on-hover"
           title="Delete picture"
           onClick={onRemove}>
        <i className="fa fa-trash" />
      </div>
      { !selected ? (
        <div className="embed-picture show-on-hover"
             title="Embed picture inside current picture"
             onClick={onEmbed}>
          <i className="fa fa-paste" />
        </div>
      ) : null }
      <svg height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMinYMax">
        {children}
      </svg>
    </div>
  )
};

export default Picture;

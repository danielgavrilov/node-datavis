import React from "react";

function roundRect({ x, y, width, height, radius, ...props }) {
  const r = radius;
  const innerWidth = width - 2*r;
  const innerHeight = height - 2*r;
  const path = `
    M ${x + r}, ${y}
    h ${innerWidth}
    a ${r} ${r} 0 0 1 ${r} ${r}
    v ${innerHeight}
    a ${r} ${r} 0 0 1 ${-r} ${r}
    h ${-innerWidth}
    a ${r} ${r} 0 0 1 ${-r} ${-r}
    v ${-innerHeight}
    a ${r} ${r} 0 0 1 ${r} ${-r}
    z
  `;
  return (
    <path d={path} {...props} />
  )
}

export default roundRect;

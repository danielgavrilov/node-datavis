import React from "react";

const Node = ({ name, node, selected }) => {
  const x = node.getIn(["properties", "x"]);
  const y = node.getIn(["properties", "y"]);
  const style = { left: x + "px", top: y + "px" };
  return (
    <div className="computation-node" style={style}>
      {name}
    </div>
  );
}

export default Node;

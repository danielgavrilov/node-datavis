import React from "react";

import Node from "./Node";

const NodesContainer = ({ nodes, selected }) => {
  const allNodes = nodes.map((node, nodeId) => (
    <Node key={nodeId}
          name={nodeId}
          node={node}
          selected={nodeId === selected} />
  )).toList();
  return (
    <div className="computation-nodes-container">
      <div className="computation-nodes">
        {allNodes}
      </div>
    </div>
  );
};

export default NodesContainer;

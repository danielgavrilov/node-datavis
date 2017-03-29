import React from "react";

import ArcsContainer from "./ArcsContainer";
import NodesContainer from "./NodesContainer";

const ArcsAndNodes = ({
  arcs,
  nodes,
  selected
}) => {

  const selectedType = selected.get("type");
  const selectedItem = selected.get("item");

  return (
    <div>
      <ArcsContainer arcs={arcs} selected={selectedType === "arc" ? selectedItem : null} />
      <NodesContainer nodes={nodes} selected={selectedType === "node" ? selectedItem : null} />
    </div>
  );
};

export default ArcsAndNodes;

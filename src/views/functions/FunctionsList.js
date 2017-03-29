import React from "react";

import Function from "./Function";

const FunctionsList = ({ functions, onFunctionClick }) => {
  const children = functions.toList().map((fn) => {
    const name = fn.get("name");
    return (
      <Function key={name} name={name} onClick={() => onFunctionClick(name)} />
    );
  }).toJS();
  return (
    <div className="functions-list">
      {children.length > 0 ? children : <p>No functions found.</p>}
    </div>
  )
}

export default FunctionsList;

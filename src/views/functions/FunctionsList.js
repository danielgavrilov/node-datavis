import React from "react";

import Function from "./Function";

const FunctionsList = ({ functions, onFunctionClick }) => {
  const children = functions.map((fn, id) => {
    return (
      <Function key={id} name={id} onClick={() => onFunctionClick(id)} />
    );
  }).toList().toJS();
  return (
    <div className="functions-list">
      {children.length > 0 ? children : <p>No functions found.</p>}
    </div>
  )
}

export default FunctionsList;

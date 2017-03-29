import React from "react";

const Function = ({ name, onClick }) => (
  <div className="functions-item" onClick={() => onClick()}>
    {name}
  </div>
);

export default Function;

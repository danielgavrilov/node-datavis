import React from "react";

import Parameter from "./Parameter";

const ParametersList = ({
  empty,
  parameters,
  onNameChange,
  onValueChange
}) => {
  if (empty) {
    return null;
  }
  const parameterElems = parameters.map((value, name) => (
    <Parameter key={name}
               name={name}
               value={value}
               onNameChange={onNameChange}
               onValueChange={onValueChange} />
  )).toList();
  return (
    <div className="parameters-list">
      {parameterElems}
    </div>
  );
};

export default ParametersList;

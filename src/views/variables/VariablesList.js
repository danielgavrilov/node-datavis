import React from "react";

import Variable from "./Variable";

const VariablesList = ({
  title,
  categoryName,
  variables,
  variableNames,
  variableValues,
  onNameChange,
  onValueChange
}) => {
  if (variableNames.count() === 0) return null;
  const variableElems = variableNames.map((variableName) => {
    const variable = variables.get(variableName);
    const value = variableValues[variableName];
    return (
      <Variable key={variableName}
                name={variableName}
                category={categoryName}
                variable={variable}
                value={value}
                onNameChange={onNameChange}
                onValueChange={onValueChange} />
    );
  });
  return (
    <div className="variables-category">
      <h3 className="category-title">{categoryName}</h3>
      {variableElems}
    </div>
  );
};

export default VariablesList;

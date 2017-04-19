import React from "react";
import { ObjectInspector } from "react-inspector";

import EditableText from "../common/EditableText";

const Variable = ({
  name,
  category,
  variable,
  value,
  onNameChange,
  onValueChange,
  onRemove
}) => {
  return (
    <div className="variable-container">
      <div className="variable-name-container">
        { category === "required" ?
          <div className={"variable-name category--" + category}>{name}</div> :
          <EditableText className={"variable-name category--" + category}
                        value={name}
                        noNewlines={true}
                        noSpaces={true}
                        onChangeEnd={(newName) => onNameChange(name, newName)} />
        }
      </div>
      <VariableValue variable={variable}
                     value={value}
                     onChange={(expression) => onValueChange(name, expression, "EXPRESSION")} />
      { category !== "required" ? (
        <div className="remove-variable"
             title="Remove variable"
             onClick={() => onRemove(name)}>
          <i className="fa fa-minus" />
        </div>
      ) : null }
    </div>
  );
};

const VariableValue = ({ variable, value, onChange }) => {
  const expression = variable.get("expression");
  if (expression != null) {
    return (
      <EditableText className={"variable-value expression"}
                    value={expression}
                    noNewlines={false}
                    noSpaces={false}
                    onChange={onChange} />
    )
  } else {
    return (
      <div className="variable-value value">
        <ObjectInspector data={value} />
      </div>
    );
  }
};

export default Variable;

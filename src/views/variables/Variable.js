import React from "react";
import { ObjectInspector } from "react-inspector";

import EditableText from "../common/EditableText";

const Variable = ({ name, category, variable, value, onNameChange, onValueChange }) => {
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
      <div className="variable-value">
        <ObjectInspector data={value} />
      </div>
    </div>
  );
};

const Expression = ({ expression }) => (
  <input type="text" defaultValue={expression} />
)


export default Variable;

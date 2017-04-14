import React from "react";

import EditableText from "../common/EditableText";

const Parameter = ({
  name,
  value,
  onNameChange,
  onValueChange
}) => (
  <div className="parameter-container">
    <div className="parameter-name">
      <EditableText value={name}
                    noNewlines={true}
                    noSpaces={true}
                    placeholder="parameter"
                    onChangeEnd={(newName) => onNameChange(name, newName)} />
    </div>
    <div className="parameter-value">
      <EditableText value={value}
                    noNewlines={false}
                    noSpaces={false}
                    placeholder="value"
                    onChange={(value) => onValueChange(name, value)} />
    </div>
  </div>
);

export default Parameter;

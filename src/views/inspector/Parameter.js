import React from "react";

import EditableText from "../common/EditableText";

const Parameter = ({
  name,
  value,
  onNameChange,
  onValueChange
}) => (
  <div className={"parameter-container " + (!value ? "inactive" : "")}>
    <EditableText className="parameter-name"
                  value={name}
                  noNewlines={true}
                  noSpaces={true}
                  placeholder="parameter"
                  onChangeEnd={(newName) => onNameChange(name, newName)} />
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

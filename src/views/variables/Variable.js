import React from "react";
import { ObjectInspector } from "react-inspector";

import EditableText from "../common/EditableText";

const Variable = ({ name, category, variable, value }) => {
  const expression = variable.get("expression");
  return (
    <div className="variable-container">
      <div className={"variable-name category--" + category}>
        <EditableText value={name} setValue={() => null} />
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

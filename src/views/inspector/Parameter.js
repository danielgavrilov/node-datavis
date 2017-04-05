import React from "react";

import EditableText from "../common/EditableText";

const Parameter = ({ name, value }) => (
  <div className="parameter-container">
    <div className="parameter-name">
      <EditableText value={name}
                    noNewlines={true}
                    noSpaces={true}
                    placeholder="parameter"
                    setValue={() => null}/>
    </div>
    <div className="parameter-value">
      <EditableText value={value}
                    noNewlines={true}
                    noSpaces={true}
                    placeholder="value"
                    setValue={() => null} />
    </div>
  </div>
);

export default Parameter;

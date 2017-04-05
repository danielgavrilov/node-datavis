import React from "react";

import EditableText from "../common/EditableText";

const Scope = ({ scope }) => (
  <div className="scope-container">
    <div className="scope-label">
      Scope
    </div>
    <div className="scope-name">
      <EditableText value={scope}
                    noNewlines={true}
                    noSpaces={true}
                    placeholder="Global"
                    setValue={() => null} />
    </div>
  </div>
);

export default Scope;

import React from "react";

import PaneHeader from "../common/PaneHeader";

import "../../css/variables-pane.css";

const VariablesPane = () => (
  <div className="variables-pane">
    <PaneHeader>
      Variables
    </PaneHeader>
    <div className="variables-list">
    </div>
  </div>
);

export default VariablesPane;

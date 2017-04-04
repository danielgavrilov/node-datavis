import React from "react";

import PaneHeader from "../common/PaneHeader";
import VariablesCategories from "./VariablesCategories";

import "../../css/variables-pane.css";

const VariablesPane = () => (
  <div className="variables-pane">
    <PaneHeader>
      Variables
    </PaneHeader>
    <VariablesCategories />
  </div>
);

export default VariablesPane;

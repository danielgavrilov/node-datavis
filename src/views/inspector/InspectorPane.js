import React from "react";

import PaneHeader from "../common/PaneHeader";
import SubpicturesList from "./SubpicturesList";
import ParametersList from "./ParametersList";

import "../../css/inspector-pane.css";

const InspectorPane = () => (
  <div className="inspector-pane">
    <PaneHeader>
      Subpictures
    </PaneHeader>
    <div className="horizontal-panes">
      <div className="subpictures-container">
        <SubpicturesList />
      </div>
      <div className="parameters-container">
        <ParametersList />
      </div>
    </div>
  </div>
);

export default InspectorPane;

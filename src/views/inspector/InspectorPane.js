import React from "react";

import PaneHeader from "../common/PaneHeader";
import SubpicturesList from "./SubpicturesList";
import Inspector from "./Inspector";

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
        <Inspector />
      </div>
    </div>
  </div>
);

export default InspectorPane;

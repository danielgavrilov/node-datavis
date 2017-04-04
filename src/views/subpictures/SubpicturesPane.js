import React from "react";

import PaneHeader from "../common/PaneHeader";
import SubpicturesList from "./SubpicturesList";

import "../../css/subpictures-pane.css";

const SubpicturesPane = () => (
  <div className="subpictures-pane">
    <PaneHeader>
      Subpictures
    </PaneHeader>
    <SubpicturesList />
  </div>
);

export default SubpicturesPane;

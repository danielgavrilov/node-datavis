import React, { Component } from "react";

import ArcsAndNodesContainer from "./ArcsAndNodesContainer";

import "../../css/computation-pane.css";

class ComputationPane extends Component {

  render() {
    return (
      <div className="computation-pane">
        <ArcsAndNodesContainer />
      </div>
    );
  }

}

export default ComputationPane;

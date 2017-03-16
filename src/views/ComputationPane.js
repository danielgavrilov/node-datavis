import _ from "lodash";
import React, { Component } from 'react';

import ComputationNode from "./ComputationNode";

import "../css/computation-pane.css";

class ComputationGraph extends Component {
  render() {
    const nodes = _.values(this.props.graph).map((node) =>
      <ComputationNode key={node.name} node={node} />
    );
    return (
      <div className="computation-pane">
        <svg className="computation-connectors" />
        <div className="computation-nodes-container">
          <div className="computation-nodes">
            {nodes}
          </div>
        </div>
      </div>
    );
  }
}

export default ComputationGraph;

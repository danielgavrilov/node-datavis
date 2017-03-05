import _ from "lodash";
import React, { Component } from 'react';

import "../css/computation-graph.css";

class ComputationGraph extends Component {
  render() {
    const node = this.props.node;
    return (
      <div className="computation-graph-node">
        {node.name}
      </div>
    );
  }
}

export default ComputationGraph;

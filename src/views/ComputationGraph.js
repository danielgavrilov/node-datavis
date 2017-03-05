import _ from "lodash";
import React, { Component } from 'react';

import ComputationGraphNode from "./ComputationGraphNode";

import "../css/computation-graph.css";

class ComputationGraph extends Component {
  render() {
    const nodes = _.values(this.props.graph).map((node) =>
      <ComputationGraphNode key={node.name} node={node} />
    );
    return (
      <div className="computation-graph">
        <div className="computation-graph-nodes">
          {nodes}
        </div>
      </div>
    );
  }
}

export default ComputationGraph;

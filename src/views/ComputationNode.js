import _ from "lodash";
import React, { Component } from 'react';

class ComputationNode extends Component {
  render() {
    const node = this.props.node;
    const style = { left: node.x + "px", top: node.y + "px" };
    return (
      <div className="computation-node" style={style}>
        {node.name}
      </div>
    );
  }
}

export default ComputationNode;

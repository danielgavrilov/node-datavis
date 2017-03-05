import React, { Component } from 'react';

import "../css/functions-pane.css";

class FunctionsPane extends Component {
  render() {
    const functions = this.props.functions.map((fn) =>
      <div className="functions-item" key={fn.name}>{fn.name}</div>
    );
    return (
      <div className="functions-pane">
        <div className="functions-list">
          {functions}
        </div>
      </div>
    );
  }
}

export default FunctionsPane;

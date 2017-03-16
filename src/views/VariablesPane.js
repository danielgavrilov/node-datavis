import _ from "lodash";
import React, { Component } from 'react';

import "../css/variables-pane.css";

function Expression(expression) {
  return (
    <div className="variables-item-expression-container">
      <div className="variables-item-expression">
        <input type="text" defaultValue={expression} />
      </div>
    </div>
  )
}

function NormalVariable(variable) {
  return (
    <div className="variables-item" key={variable.name}>
      <div className="variables-item-label-container">
        <span className="variables-item-label">
          {variable.name}
        </span>
      </div>
      { variable.expression && Expression(variable.expression) }
    </div>
  )
}

function ArrayVariable(variable) {
  const subvariables = variable.subvariables.map((subvariable) =>
    <div className="variables-item" key={variable.name}>
      <div className="variables-item-label-container">
        <span className="variables-item-label variables-item-array-subvariable">
          {subvariable.name}
        </span>
      </div>
    </div>
  )
  return (
    <div className="variables-item" key={variable.name}>
      <div className="variables-item-label-container">
        <span className="variables-item-label variables-item-array-variable">
          {variable.name}
        </span>
      </div>
    </div>
  );
}

class FunctionsPane extends Component {
  render() {
    const variables = _.values(this.props.variables).map((variable) =>
      variable.subvariables && variable.subvariables.length > 0 ?
      ArrayVariable(variable) :
      NormalVariable(variable)
    );
    return (
      <div className="variables-pane">
        <div className="variables-pane-title">
          Variables
        </div>
        <div className="variables-list">
          {variables}
        </div>
      </div>
    );
  }
}

export default FunctionsPane;

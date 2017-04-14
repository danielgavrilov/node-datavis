import React from "react";
import { connect } from "react-redux";

import { currentPicture } from "../../utils/pictures";
import { renameVariable, changeVariable } from "../../actions";

import VariablesList from "./VariablesList";

const VariablesCategories = ({
  variables,
  variableValues,
  categories,
  onNameChange,
  onValueChange
}) => {
  const lists = categories.map((variableNames, categoryName) => {
    return (
      <VariablesList key={categoryName}
                     title={categoryName}
                     categoryName={categoryName}
                     variables={variables}
                     variableValues={variableValues}
                     variableNames={variableNames}
                     onNameChange={onNameChange}
                     onValueChange={onValueChange} />
    )
  }).toList();
  return (
    <div className="variables-container">
      {lists}
    </div>
  );
}

const mapStateToProps = (state) => {
  const picture = currentPicture(state);
  const graph = picture.get("graph");
  const variables = picture.get("variables").map((variable, name) => {
    if (!variable) debugger;
    const __ref = variable.get("__ref");
    const node = graph.get(__ref);
    return node;
  });
  const variableValues = picture.get("__results").variables;
  const categories = picture.get("variableCategories");
  return {
    variables,
    variableValues,
    categories
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    onNameChange: (oldName, newName) => {
      return dispatch(renameVariable(oldName, newName));
    },
    onValueChange: (name, value, valueType) => {
      return dispatch(changeVariable(name, value, valueType));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariablesCategories)

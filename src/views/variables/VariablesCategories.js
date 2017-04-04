import React from "react";
import { connect } from "react-redux";

import currentPicture from "../../utils/current-picture";

import VariablesList from "./VariablesList";

const VariablesCategories = ({ variables, variableValues, categories }) => {
  const lists = categories.map((variableNames, categoryName) => {
    return (
      <VariablesList key={categoryName}
                     title={categoryName}
                     categoryName={categoryName}
                     variables={variables}
                     variableValues={variableValues}
                     variableNames={variableNames} />
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
  const variables = picture.get("variables").map((variable) => {
    const __ref = variable.get("__ref");
    return graph.get(__ref);
  });
  const variableValues = picture.get("__results").variables;
  const categories = picture.get("variableCategories");
  return {
    variables,
    variableValues,
    categories
  };
};

export default connect(
  mapStateToProps
)(VariablesCategories)

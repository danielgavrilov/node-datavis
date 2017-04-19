import React from "react";
import { connect } from "react-redux";
import { List, Map } from "immutable";

import {
  getPicture,
  currentPicture,
  isPrimitive
} from "../../utils/pictures";

import {
  renameParameter,
  changeParameter,
  changeScope
} from "../../actions";

import Scope from "./Scope";
import ParametersList from "./ParametersList";

const Inspector = ({
  empty,
  parameters,
  scope,
  onNameChange,
  onValueChange,
  onScopeChange
}) => {
  return empty ? null : (
    <div className="parameters-content">
      <Scope scope={scope}
             onScopeChange={onScopeChange} />
      <ParametersList parameters={parameters}
                      onNameChange={onNameChange}
                      onValueChange={onValueChange} />
    </div>
  );
};

const mapStateToProps = (state) => {
  const subpictureId = state.getIn(["editor", "inspectorPane", "subpictureId"]);
  if (subpictureId == null) {
    return { empty: true };
  }
  const subpicture = currentPicture(state).getIn(["subpictures", subpictureId]);
  const pictureId = subpicture.get("picture");
  const picture = getPicture(state, pictureId);
  const variableCategories = picture.get("variableCategories");
  let variableNames = List();
  ["required", "sources", "custom"].forEach((category) => {
    const variableNamesInCategory = variableCategories.get(category);
    variableNames = variableNames.concat(variableNamesInCategory);
  });
  const scope = subpicture.get("scope");
  const override = subpicture.get("override");
  const pictureParameters = Map(variableNames.map((name) => ([name, ""])));
  let parameters = Map();
  if (!isPrimitive(pictureId)) {
    parameters = parameters.merge(Map([["x", ""], ["y", ""]]));
  }
  parameters = parameters.merge(pictureParameters)
                         .merge(override);
  return {
    empty: false,
    parameters,
    scope
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (oldName, newName) => {
      return dispatch(renameParameter(oldName, newName));
    },
    onValueChange: (name, value, valueType) => {
      return dispatch(changeParameter(name, value));
    },
    onScopeChange: (newScope) => {
      return dispatch(changeScope(newScope));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inspector);

import React from "react";
import { connect } from "react-redux";
import { List, Map } from "immutable";

import { getPicture, currentPicture } from "../../utils/pictures";

import Scope from "./Scope";
import ParametersList from "./ParametersList";

const Inspector = ({ empty, parameters, scope }) => {
  return empty ? null : (
    <div className="parameters-content">
      <Scope scope={scope} />
      <ParametersList parameters={parameters} />
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
  let parameters = Map(variableNames.map((name) => List([name, ""])));
  parameters = parameters.merge(override);
  return {
    empty: false,
    parameters,
    scope
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inspector);

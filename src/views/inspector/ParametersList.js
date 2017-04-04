import React from "react";
import { connect } from "react-redux";
import { List } from "immutable";

import { getPicture, currentPicture } from "../../utils/pictures";

const ParametersList = ({ empty, variableNames }) => {
  if (empty) {
    return null;
  }
  return (
    <div>{variableNames.join(",")}</div>
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
    variableNames = variableNames.concat(variableCategories.get(category));
  });
  return {
    empty: false,
    variableNames
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParametersList);

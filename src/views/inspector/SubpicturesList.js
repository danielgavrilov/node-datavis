import React from "react";
import { connect } from 'react-redux';

import { selectSubpicture } from "../../actions";
import { currentPicture } from "../../utils/pictures";

import Subpicture from "./Subpicture";

const SubpicturesList = ({ pictures, subpictures, order, selectedId, onSubpictureClick }) => {
  const subpictureElems = order.map((subpictureId) => {
    const subpicture = subpictures.get(subpictureId);
    const pictureId = subpicture.get("picture");
    const pictureName = pictures.getIn([pictureId, "name"]) || pictureId;
    const scope = subpicture.get("scope");
    return (
      <Subpicture key={subpictureId}
                  name={pictureName}
                  scope={scope}
                  selected={subpictureId === selectedId}
                  onClick={() => onSubpictureClick(subpictureId)} />
    );
  });
  return (
    <div className="subpictures-list">
      {subpictureElems}
    </div>
  );
};

const mapStateToProps = (state) => {
  const pictures = state.get("pictures");
  const picture = currentPicture(state);
  const subpictures = picture.get("subpictures")
  const order = picture.get("subpicturesOrder");
  const selectedId = state.getIn(["editor", "inspectorPane", "subpictureId"]);
  return {
    pictures,
    subpictures,
    order,
    selectedId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubpictureClick: (subpictureId) => {
      return dispatch(selectSubpicture(subpictureId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubpicturesList);

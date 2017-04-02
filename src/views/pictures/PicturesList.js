import React from "react";
import { connect } from 'react-redux';

import { selectPicture } from "../../actions";
import Picture from "./Picture";

const PicturesList = ({ pictures, order, selectedId, onPictureClick }) => {
  const pictureElems = order.map((pictureId) => {
    const picture = pictures.get(pictureId);
    return (
      <Picture key={pictureId}
               picture={picture}
               selected={pictureId === selectedId}
               onClick={() => onPictureClick(pictureId)} />
    );
  });
  return (
    <div className="pictures-list">
      {pictureElems}
    </div>
  );
};

const mapStateToProps = (state) => {
  const pictures = state.get("pictures")
  const order = state.getIn(["editor", "picturesPane", "picturesOrder"]);
  const selectedId = state.getIn(["editor", "pictureId"]);
  return {
    pictures,
    order,
    selectedId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPictureClick: (pictureId) => {
      return dispatch(selectPicture(pictureId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PicturesList);

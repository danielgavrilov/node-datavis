import React from "react";
import { connect } from 'react-redux';

import { selectPicture, addPicture } from "../../actions";

import Picture from "./Picture";
import AddPicture from "./AddPicture";

const PicturesList = ({ pictures, order, selectedId, onPictureClick, onAddPicture }) => {
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
      <AddPicture onClick={() => onAddPicture()} />
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
    },
    onAddPicture: () => {
      return dispatch(addPicture());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PicturesList);

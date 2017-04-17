import React from "react";
import { connect } from 'react-redux';

import {
  selectPicture,
  addPicture,
  removePicture
} from "../../actions";

import Picture from "./Picture";
import AddPicture from "./AddPicture";

const PicturesList = ({
  pictures,
  order,
  selectedId,
  onPictureClick,
  onAddPicture,
  onRemovePicture
}) => {
  const pictureElems = order.map((pictureId) => {
    const picture = pictures.get(pictureId);
    return (
      <Picture key={pictureId}
               picture={picture}
               selected={pictureId === selectedId}
               onClick={() => onPictureClick(pictureId)}
               onRemove={(event) => {
                 event.stopPropagation();
                 onRemovePicture(pictureId);
               }} />
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
    },
    onRemovePicture: (pictureId) => {
      return dispatch(removePicture(pictureId));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PicturesList);

import React from "react";
import { connect } from 'react-redux';

import { addSubpicture } from "../../actions";
import primitives, { names } from "../../pictures/primitives";

const PrimitivesPalette = ({ onAddSubpicture }) => {
  const primitiveIcons = names.map((name) => {
    const icon = primitives[name].icon;
    return (
      <div key={name} className="primitive" onClick={() => onAddSubpicture(name)}>
        {icon}
      </div>
    );
  });
  return (
    <div className="primitives-palette">
      {primitiveIcons}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddSubpicture: (pictureId) => {
      return dispatch(addSubpicture(pictureId));
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PrimitivesPalette);

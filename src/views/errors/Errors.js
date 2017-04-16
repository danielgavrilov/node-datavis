import React from "react";
import { connect } from 'react-redux';

import { currentPicture } from "../../utils/pictures";

import "../../css/errors.css";

const Errors = ({ errors }) => {
  if (!errors || errors.length === 0) {
    return null;
  }
  const errorElems = errors.map((error, index) => {
    return (
      <div key={index} className="error">{error.message}</div>
    );
  });
  return (
    <div className="errors">
      {errorElems}
    </div>
  );
};

const mapStateToProps = (state) => {
  const picture = currentPicture(state);
  const errors = picture.get("__errors");
  return { errors };
}

export default connect(
  mapStateToProps
)(Errors);

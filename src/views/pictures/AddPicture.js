import React from "react";

const AddPicture = ({ onClick }) => (
  <div className="add-picture" title="Add blank picture" onClick={onClick}>
    <i className="fa fa-plus" />
  </div>
);

export default AddPicture;

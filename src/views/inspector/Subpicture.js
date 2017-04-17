import React from "react";

const Subpicture = ({ name, scope, selected, onClick, onRemove }) => {
  const className = "subpicture" + (selected ? " selected" : "");
  return (
    <div className={className} onClick={onClick}>
      <div className="subpicture-name">{name}</div>
      { scope ? <div className="subpicture-scope">{scope}</div> : null }
      <div className="remove-subpicture" onClick={onRemove}>
        <i className="fa fa-trash"></i>
      </div>
    </div>
  )
};

export default Subpicture;

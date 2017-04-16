import React from "react";

const Subpicture = ({ name, scope, selected, onClick }) => {
  const className = "subpicture" + (selected ? " selected" : "");
  return (
    <div className={className} onClick={onClick}>
      { scope ? <div className="subpicture-scope">{scope}</div> : null }
      <div className="subpicture-name">{name}</div>
    </div>
  )
};

export default Subpicture;

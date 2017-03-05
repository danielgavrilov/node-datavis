import _ from "lodash";
import React, { Component } from 'react';

import "../css/pictures-pane.css";

class FunctionsPane extends Component {
  render() {
    const pictures = _.values(this.props.pictures).map((picture) =>
      <div className="picture" key={picture.name}>{picture.name}</div>
    );
    return (
      <div className="pictures-pane">
        <div className="pictures-list">
          {pictures}
        </div>
      </div>
    );
  }
}

export default FunctionsPane;

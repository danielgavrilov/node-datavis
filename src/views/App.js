import React, { Component } from 'react';

// import RoundRect from "../shapes/round-rect";

class App extends Component {
  render() {
    return (
      <div className="panes">
        <div className="left-pane">
          <div className="pane-inner"></div>
        </div>
        <div className="middle-pane">
          <div className="pane-inner"></div>
        </div>
        <div className="right-pane">
          <div className="pane-inner"></div>
        </div>
      </div>
    );
  }
}

export default App;

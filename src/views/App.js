import React, { Component } from 'react';

import Errors from "./errors/Errors.js";
import PicturesPane from "./pictures/PicturesPane";
import FunctionsPane from "./functions/FunctionsPane";
import ComputationPane from "./computation-graph/ComputationPane";
import CanvasPane from "./canvas/CanvasPane";
import VariablesPane from "./variables/VariablesPane";
import InspectorPane from "./inspector/InspectorPane";

class App extends Component {
  render() {
    return (
      <div id="root" className="panes">

        <Errors />

        <PicturesPane />

        <div className="horizontal-panes">

          <FunctionsPane />
          <ComputationPane />

          <div className="drawing-pane">

            <CanvasPane />

            <div className="vertical-panes">
              <VariablesPane />
              <InspectorPane />
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default App;

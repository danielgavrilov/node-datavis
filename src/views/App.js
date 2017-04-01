import React, { Component } from 'react';

import PicturesPane from "./pictures/PicturesPane";
import FunctionsPane from "./functions/FunctionsPane";
import ComputationPane from "./computation-graph/ComputationPane";
import CanvasPane from "./canvas/CanvasPane";
import VariablesPane from "./variables/VariablesPane";
import SubpicturesPane from "./subpictures/SubpicturesPane";
import InspectorPane from "./inspector/InspectorPane";

class App extends Component {
  render() {
    return (
      <div id="root" className="panes">

        <PicturesPane />

        <div className="horizontal-panes">

          <FunctionsPane />
          <ComputationPane />

          <div className="drawing-pane">

            <CanvasPane />

            <div className="vertical-panes">
              <VariablesPane />
              <SubpicturesPane />
              <InspectorPane />
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default App;

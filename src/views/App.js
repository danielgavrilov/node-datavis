import React, { Component } from 'react';

// import RoundRect from "../shapes/round-rect";
import PicturesPane from "./PicturesPane";
import FunctionsPane from "./functions/FunctionsPane";
import ComputationPane from "./computation-graph/ComputationPane";
import DrawingPane from "./DrawingPane";

import exampleVariables from "../examples/variables";
import exampleSubpictures from "../examples/subpictures";


class App extends Component {
  render() {
    return (
      <div id="root" className="panes">

        <PicturesPane />

        <div className="horizontal-panes">
          <FunctionsPane />
          <ComputationPane />
          <DrawingPane variables={exampleVariables} subpictures={exampleSubpictures} />
        </div>

      </div>
    );
  }
}

export default App;

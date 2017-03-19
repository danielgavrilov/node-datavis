import React, { Component } from 'react';

// import RoundRect from "../shapes/round-rect";
import PicturesPane from "./PicturesPane";
import FunctionsPane from "./FunctionsPane";
import ComputationPane from "./ComputationPane";
import DrawingPane from "./DrawingPane";

import exampleFunctions from "../examples/functions";
import exampleComputation from "../examples/computation";
import exampleVariables from "../examples/variables";
import exampleSubpictures from "../examples/subpictures";


class App extends Component {
  render() {
    return (
      <div id="root" className="panes">

        <PicturesPane />

        <div className="horizontal-panes">
          <FunctionsPane functions={exampleFunctions} />
          <ComputationPane graph={exampleComputation} />
          <DrawingPane variables={exampleVariables} subpictures={exampleSubpictures} />
        </div>

      </div>
    );
  }
}

export default App;

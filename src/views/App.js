import React, { Component } from 'react';

// import RoundRect from "../shapes/round-rect";
import PicturesPane from "./PicturesPane";
import FunctionsPane from "./FunctionsPane";
import ComputationPane from "./ComputationPane";
import VariablesPane from "./VariablesPane";
import DrawingPane from "./DrawingPane";

import exampleFunctions from "../examples/functions";
import exampleComputation from "../examples/computation";
import exampleVariables from "../examples/variables";

class App extends Component {
  render() {
    return (
      <div id="root" className="panes">

        <PicturesPane />

        <div className="horizontal-panes">
          <FunctionsPane functions={exampleFunctions} />
          <ComputationPane graph={exampleComputation} />
          <VariablesPane variables={exampleVariables} />
          <DrawingPane />
        </div>

      </div>
    );
  }
}

export default App;

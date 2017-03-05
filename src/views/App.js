import React, { Component } from 'react';

// import RoundRect from "../shapes/round-rect";
import PicturesPane from "./PicturesPane";
import FunctionsPane from "./FunctionsPane";
import ComputationGraph from "./ComputationGraph";

import exampleFunctions from "../examples/functions";
import exampleGraph from "../examples/computation-graph";

class App extends Component {
  render() {
    return (
      <div id="root" className="panes">

        <PicturesPane />

        <div className="horizontal-panes">
          <FunctionsPane functions={exampleFunctions} />
          <ComputationGraph graph={exampleGraph} />
        </div>

      </div>
    );
  }
}

export default App;

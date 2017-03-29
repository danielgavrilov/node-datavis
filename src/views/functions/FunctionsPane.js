import React, { Component } from "react";

import PaneHeader from "../common/PaneHeader";
import FilteredFunctions from "./FilteredFunctions";

import "../../css/functions-pane.css";

class FunctionsPane extends Component {

  constructor(props) {
    super(props);

    this.state = { search: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({ search: value });
  }

  render() {
    return (
      <div className="functions-pane">
        <PaneHeader>
          Functions
        </PaneHeader>
        <div className="functions-pane-search">
          <input type="search"
                 value={this.state.search}
                 onChange={this.handleChange}
                 placeholder="Search for a function" />
        </div>
        <FilteredFunctions search={this.state.search} />
      </div>
    )
  }

}

export default FunctionsPane;

import _ from "lodash";
import { fromJS } from "immutable";
import { connect } from 'react-redux';

import computeArcs from "../../engine/arcs";
import { currentPicture } from "../../utils/pictures";

import ArcsAndNodes from "./ArcsAndNodes";

const mapStateToProps = (state) => {
  const picture = currentPicture(state);
  const graph = picture.get("graph");
  const arcs = fromJS(computeArcs(graph)); // convert to Immutable for consistency
  const nodes = graph.filter((node) => node.get("visible"));
  const selected = state.getIn(["editor", "computationPane", "selected"]);
  return {
    arcs,
    nodes,
    selected
  };
}

const ArcsAndNodesContainer = connect(
  mapStateToProps
)(ArcsAndNodes);

export default ArcsAndNodesContainer;

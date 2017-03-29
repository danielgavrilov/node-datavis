import _ from "lodash";
import { connect } from 'react-redux';

import currentPicture from "../../utils/current-picture";

import FunctionsList from "./FunctionsList";

function filter(functions, searchString) {
  if (!searchString) {
    return functions;
  } else {
    return functions.filter((fn, name) => {
      return name.includes(searchString);
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  const picture = currentPicture(state);
  const functions = picture.get("functions");
  return {
    functions: filter(functions, ownProps.search)
  }
}

const VisibleTodoList = connect(
  mapStateToProps
)(FunctionsList);

export default VisibleTodoList;

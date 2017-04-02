import _ from "lodash";
import { fromJS, Map } from "immutable";

const defaults = {
  functions: {},
  variables: {},
  graph: {},
  draw: () => null
};

function blank() {
  return fromJS(defaults);
}

export default function({ variables, draw }) {

  let picture = blank();

  _.forEach(variables, (value, name) => {

    const variable = Map().set("__ref", name);
    const node = Map().set("__value", variables[name]);

    picture = picture.setIn(["variables", name], variable)
                     .setIn(["graph", name], node);
  });

  return {
    picture,
    draw
  };
}

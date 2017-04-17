import _ from "lodash";
import { fromJS, Map } from "immutable";

const defaults = {
  name: "",
  functions: {},
  variables: {},
  variableCategories: {
    required: [],
    sources: [],
    custom: []
  },
  graph: {},
  subpictures: {},
  subpicturesOrder: []
};

function blank() {
  return fromJS(defaults);
}

export default function({ name, variables, order, draw, icon }) {

  let picture = blank();

  picture = picture.set("name", name);

  _.forEach(variables, (value, name) => {

    const variable = Map().set("__ref", name);
    const node = Map().set("__value", variables[name]);

    picture = picture.setIn(["variables", name], variable)
                     .setIn(["graph", name], node)
                     .setIn(["variableCategories", "required"], fromJS(order));
  });

  return {
    picture,
    draw,
    icon
  };
}

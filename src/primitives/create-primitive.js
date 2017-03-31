import React from "react";
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

function remapProps(props, propsMap) {
  return _.mapKeys(props, (value, prop) => {
    return _.has(propsMap, prop) ? propsMap[prop] : prop;
  });
}

export default function(elementName, variables, propMap={}) {

  let picture = blank();

  _.forEach(variables, (value, name) => {

    const variable = Map().set("__ref", name);
    const node = Map().set("value", variables[name]);

    picture = picture.setIn(["variables", name], variable)
                     .setIn(["graph", name], node);
  });

  const draw = (props) => {
    return React.createElement(elementName, remapProps(props, propMap));
  };

  picture = picture.set("draw", draw);

  return picture;
}

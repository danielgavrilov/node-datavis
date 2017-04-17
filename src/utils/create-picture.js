import { stateFromJS } from "./state";

export default function({ name }) {
  return stateFromJS({
    name: name,
    functions: {},
    variables: {
      "width": {
        __ref: "var_width"
      },
      "height": {
        __ref: "var_height"
      }
    },
    variableCategories: {
      required: [
        "width",
        "height"
      ],
      sources: [],
      custom: []
    },
    graph: {
      "var_width": {
        type: "VARIABLE",
        name: "width",
        expression: "300",
        visible: false
      },
      "var_height": {
        type: "VARIABLE",
        name: "height",
        expression: "300",
        visible: false
      },
    },
    subpictures: {},
    subpicturesOrder: []
  });
}

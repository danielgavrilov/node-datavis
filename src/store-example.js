import { stateFromJS } from "./utils/state";
import {
  SOURCE,
  FUNCTION,
  STORE,
  VARIABLE,
  VARIABLE_REPRESENTATION
} from "./engine/node-types";

export default stateFromJS({

  editor: {

    pictureId: "examplehashhash",

    computationPane: {
      selected: {
        type: "node",
        item: "test"
      }
    },

    picturesPane: {
      picturesOrder: [
        "examplehashhash",
        "examplehashhash2"
      ]
    },

    inspectorPane: {
      subpictureId: null
    }

  },

  pictures: {
    "examplehashhash": {
      name: "example",
      functions: {
        "test": {
          name: "test"
        }
      },
      variables: {
        "width": {
          __ref: "var_width"
        },
        "height": {
          __ref: "var_height"
        },
        "data": {
          __ref: "var_data"
        }
      },
      variableCategories: {
        required: [
          "width",
          "height"
        ],
        sources: [
          "data"
        ],
        custom: []
      },
      graph: {
        "var_width": {
          type: VARIABLE,
          name: "width",
          expression: "300",
          visible: false
        },
        "var_height": {
          type: VARIABLE,
          name: "height",
          expression: "300",
          visible: false
        },
        "var_data": {
          type: SOURCE,
          name: "data",
          __value: [{
            x: 30,
            y: 30,
          }, {
            x: 90,
            y: 30,
          }, {
            x: 150,
            y: 30
          }],
          visible: true,
          properties: {
            x: 10,
            y: 10,
          }
        },
      },
      subpictures: {
        "a": {
          picture: "rect",
          scope: null,
          override: {
            "fill": "\"red\""
          },
        },
        "b": {
          picture: "circle",
          scope: "data",
          override: {
            "x": "x",
            "y": "y",
            "fill": "\"blue\""
          }
        }
      },
      subpicturesOrder: [ // top to bottom
        "b", "a"
      ],
      results: {},
      preview: {} // pictureSpec
    },
    "examplehashhash2": {
      name: "example",
      functions: {
        "test": {
          name: "test"
        }
      },
      variables: {
        "width": {
          __ref: "var_width"
        },
        "height": {
          __ref: "var_height"
        },
        "data": {
          __ref: "datahashhash"
        },
        "test": {
          __ref: "var_test"
        }
      },
      variableCategories: {
        required: [
          "width",
          "height"
        ],
        sources: [
          "data"
        ],
        custom: [
          "test"
        ]
      },
      graph: {
        "var_width": {
          type: VARIABLE,
          name: "width",
          expression: "500",
          visible: false
        },
        "var_height": {
          type: VARIABLE,
          name: "height",
          expression: "300",
          visible: false
        },
        "datahashhash": {
          type: SOURCE,
          name: "data",
          __value: [{
            x: 0,
            y: 0,
          }, {
            x: 120,
            y: 60,
          }, {
            x: 240,
            y: 120
          }],
          visible: true,
          properties: {
            x: 10,
            y: 10,
          }
        },
        "var_test": {
          name: "test",
          visible: false,
          expression: "2"
        }
      },
      subpictures: {
        "a": {
          picture: "examplehashhash",
          scope: "data",
          override: {
            "x": "x",
            "y": "y"
          }
        },
        "b": {
          picture: "text",
          override: {}
        }
      },
      subpicturesOrder: [ // top to bottom
        "a", "b"
      ],
      results: {},
      preview: {} // pictureSpec
    }
  },

});

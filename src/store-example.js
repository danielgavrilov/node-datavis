import { stateFromJS } from "./utils/state";

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

    subpicturesPane: {
      selected: null
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
          __ref: "datahashhash"
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
          expression: "300",
          visible: false
        },
        "var_height": {
          expression: "300",
          visible: false
        },
        "hashhashhash": {
          name: "test",
          expression: "width",
          visible: true,
          properties: {
            x: 10,
            y: 50
          }
        },
        "datahashhash": {
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
        }
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
            "cx": "x",
            "cy": "y",
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
          expression: "500",
          visible: false
        },
        "var_height": {
          expression: "300",
          visible: false
        },
        "hashhashhash": {
          name: "test",
          expression: "width",
          visible: true,
          properties: {
            x: 10,
            y: 100
          }
        },
        "datahashhash": {
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
          __value: "just testing"
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
        }
      },
      subpicturesOrder: [ // top to bottom
        "a"
      ],
      results: {},
      preview: {} // pictureSpec
    }
  },

});

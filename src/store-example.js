import { isString } from "lodash";
import { fromJS, Iterable } from "immutable";

export default fromJS({

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
            y: 100
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
        }
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

}, function(key, value) {
  if (isString(key) && key.indexOf("__") === 0) {
    return value.toJS();
  } else {
    return Iterable.isKeyed(value) ? value.toMap() : value.toList();
  }
});

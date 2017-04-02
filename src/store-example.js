import { isString } from "lodash";
import { fromJS, Iterable } from "immutable";

export default fromJS({

  editor: {

    pictureId: "example",

    computationPane: {
      selected: {
        type: "node",
        item: "test"
      }
    }

  },

  pictures: {
    "example": {
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
            x: 30,
            y: 30,
          }, {
            x: 60,
            y: 60
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
    }
  },

}, function(key, value) {
  if (isString(key) && key.indexOf("__") === 0) {
    return value.toJS();
  } else {
    return Iterable.isKeyed(value) ? value.toMap() : value.toList();
  }
});

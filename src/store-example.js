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
          expression: "960",
          visible: false
        },
        "var_height": {
          expression: "480",
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
          __value: [],
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
          override: {},
        },
        "b": {
          picture: "circle",
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
  if (key.indexOf("__") === 0) {
    return value.toJS();
  } else {
    return Iterable.isKeyed(value) ? value.toMap() : value.toList();
  }
});

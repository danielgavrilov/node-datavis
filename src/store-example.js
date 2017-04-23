import { stateFromJS } from "./utils/state";
import {
  SOURCE,
  FUNCTION,
  STORE,
  VARIABLE,
  VARIABLE_REPRESENTATION
} from "./engine/node-types";

export default stateFromJS({
  "editor": {
    "pictureId": "i22pinj1uydvjk",
    "computationPane": {
      "selected": {
        "type": null,
        "item": null
      }
    },
    "picturesPane": {
      "picturesOrder": ["i22pinj1uydvjk"]
    },
    "inspectorPane": {
      "subpictureId": "e16647j1uyhi05"
    }
  },
  "pictures": {
    "i22pinj1uydvjk": {
      "name": "picture",
      "graph": {
        "var_width": {
          "type": "VARIABLE",
          "name": "width",
          "expression": "800",
          "visible": false
        },
        "var_height": {
          "type": "VARIABLE",
          "name": "height",
          "expression": "400",
          "visible": false
        },
        "var_letters": {
          "type": "SOURCE",
          "name": "letters",
          "__value": [{
            "letter": "A",
            "frequency": 0.08167
          }, {
            "letter": "B",
            "frequency": 0.01492
          }, {
            "letter": "C",
            "frequency": 0.02782
          }, {
            "letter": "D",
            "frequency": 0.04253
          }, {
            "letter": "E",
            "frequency": 0.12702
          }, {
            "letter": "F",
            "frequency": 0.02288
          }, {
            "letter": "G",
            "frequency": 0.02015
          }, {
            "letter": "H",
            "frequency": 0.06094
          }, {
            "letter": "I",
            "frequency": 0.06966
          }, {
            "letter": "J",
            "frequency": 0.00153
          }, {
            "letter": "K",
            "frequency": 0.00772
          }, {
            "letter": "L",
            "frequency": 0.04025
          }, {
            "letter": "M",
            "frequency": 0.02406
          }, {
            "letter": "N",
            "frequency": 0.06749
          }, {
            "letter": "O",
            "frequency": 0.07507
          }, {
            "letter": "P",
            "frequency": 0.01929
          }, {
            "letter": "Q",
            "frequency": 0.00095
          }, {
            "letter": "R",
            "frequency": 0.05987
          }, {
            "letter": "S",
            "frequency": 0.06327
          }, {
            "letter": "T",
            "frequency": 0.09056
          }, {
            "letter": "U",
            "frequency": 0.02758
          }, {
            "letter": "V",
            "frequency": 0.00978
          }, {
            "letter": "W",
            "frequency": 0.0236
          }, {
            "letter": "X",
            "frequency": 0.0015
          }, {
            "letter": "Y",
            "frequency": 0.01974
          }, {
            "letter": "Z",
            "frequency": 0.00074
          }],
          "visible": false
        },
        "var_group": {
          "type": "SOURCE",
          "name": "group",
          "__value": [],
          "visible": false
        },
        "hdlbnxj1uyexqx": {
          "type": "VARIABLE",
          "name": "bar_width",
          "expression": "width / letters.length",
          "visible": false
        },
        "gmymthj1uyf8bm": {
          "type": "VARIABLE",
          "name": "max_freq",
          "expression": "d3.max(letters, d => d.frequency)",
          "visible": false
        },
        "9qnoipj1uyfryj": {
          "type": "VARIABLE",
          "name": "scale",
          "expression": "d3.scaleLinear().domain([0, max_freq]).range([height, 0])",
          "visible": false
        }
      },
      "subpictures": {
        "e16647j1uyhi05": {
          "picture": "rect",
          "scope": "letters",
          "override": {
            "x": "bar_width * index",
            "y": "scale(frequency)",
            "width": "bar_width - 1",
            "height": "height - scale(frequency)",
            "fill": "\"steelblue\""
          }
        }
      },
      "variables": {
        "width": {
          "__ref": "var_width"
        },
        "height": {
          "__ref": "var_height"
        },
        "letters": {
          "__ref": "var_letters"
        },
        "group": {
          "__ref": "var_group"
        },
        "bar_width": {
          "__ref": "hdlbnxj1uyexqx"
        },
        "max_freq": {
          "__ref": "gmymthj1uyf8bm"
        },
        "scale": {
          "__ref": "9qnoipj1uyfryj"
        }
      },
      "variableCategories": {
        "required": ["width", "height"],
        "sources": ["letters"],
        "custom": ["bar_width", "max_freq", "scale"]
      },
      "subpicturesOrder": ["e16647j1uyhi05"],
      "functions": {}
    }
  }
});

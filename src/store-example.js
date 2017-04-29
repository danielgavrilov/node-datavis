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
        "uarxrqj221lx5q": {
          "type": "VARIABLE",
          "name": "graph_height",
          "expression": "height - 25",
          "visible": false
        },
        "hdlbnxj1uyexqx": {
          "type": "VARIABLE",
          "name": "bar_width",
          "expression": "30",
          "visible": false
        },
        "var_group": {
          "type": "SOURCE",
          "name": "group",
          "__value": [],
          "visible": false
        },
        "9qnoipj1uyfryj": {
          "type": "VARIABLE",
          "name": "scale",
          "expression": "d => graph_height * (1 - d / max_freq)",
          "visible": false
        },
        "var_width": {
          "type": "VARIABLE",
          "name": "width",
          "expression": "letters.length * bar_width",
          "visible": false
        },
        "czv4bqj2219j0b": {
          "type": "VARIABLE",
          "name": "under",
          "expression": "freq => scale(freq) > (graph_height - 20)",
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
        "gmymthj1uyf8bm": {
          "type": "VARIABLE",
          "name": "max_freq",
          "expression": "d3.max(letters, d => d.frequency)",
          "visible": false
        },
        "var_height": {
          "type": "VARIABLE",
          "name": "height",
          "expression": "400",
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
            "height": "graph_height - scale(frequency)",
            "fill": "\"steelblue\""
          }
        },
        "8vt3ocj220ynqt": {
          "picture": "text",
          "scope": "letters",
          "override": {
            "x": "bar_width * index + bar_width / 2",
            "text-anchor": "\"middle\"",
            "text": "(frequency * 100).toFixed(1) + \"%\"",
            "font-weight": "",
            "y": "scale(frequency)",
            "dy": "under(frequency) ? \"-.4em\" : \"1.35em\"",
            "fill": "under(frequency) ? \"black\" : \"white\"",
            "font-size": "10"
          }
        },
        "25829dj221iw55": {
          "picture": "text",
          "scope": null,
          "override": {
            "text-anchor": "\"middle\"",
            "x": "width / 2",
            "y": "30",
            "text": "\"Frequency of letters in the English language\"",
            "font-size": "14",
            "font-weight": "\"bold\""
          }
        },
        "g208ekj221prbu": {
          "picture": "text",
          "scope": "letters",
          "override": {
            "y": "graph_height + 17",
            "x": "bar_width * index + bar_width / 2",
            "text-anchor": "\"middle\"",
            "text": "letter",
            "font-weight": "\"bold\""
          }
        },
        "xtpuwxj221ru71": {
          "picture": "line",
          "scope": null,
          "override": {
            "x1": "0",
            "x2": "width",
            "y1": "graph_height + 1",
            "y2": "graph_height + 1",
            "stroke": "\"black\"",
            "strokeWidth": "1"
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
        "scale": {
          "__ref": "9qnoipj1uyfryj"
        },
        "letters": {
          "__ref": "var_letters"
        },
        "max_freq": {
          "__ref": "gmymthj1uyf8bm"
        },
        "graph_height": {
          "__ref": "uarxrqj221lx5q"
        },
        "under": {
          "__ref": "czv4bqj2219j0b"
        },
        "bar_width": {
          "__ref": "hdlbnxj1uyexqx"
        },
        "group": {
          "__ref": "var_group"
        }
      },
      "variableCategories": {
        "required": ["width", "height"],
        "sources": ["letters"],
        "custom": ["bar_width", "max_freq", "scale", "under", "graph_height"]
      },
      "subpicturesOrder": ["8vt3ocj220ynqt", "e16647j1uyhi05", "25829dj221iw55", "g208ekj221prbu", "xtpuwxj221ru71"],
      "functions": {}
    }
  }
});

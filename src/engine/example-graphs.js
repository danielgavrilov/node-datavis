import { SOURCE, FUNCTION } from "./node-types";

export const additionGraph = {

  "add": {
    id: "add",
    definition: {
      type: FUNCTION,
      in: [{
        name: "x",
        type: [Number]
      }, {
        name: "y",
        type: [Number] // undefined means not required
      }],
      out: {
        name: "sum",
        type: [Number],
        func: function(x, y) {
          // warn when custom variable shadows global variable
          return x + y;
        }
      }
    },
    in: ["source1", "source2"],
    visual: {
      position: { x: 0, y: 0 },
      "z-index": 0,
      // various modes, settings...
    }
  },

  "source1": {
    id: "source1",
    definition: {
      type: SOURCE,
      in: [],
      out: {
        type: [Number],
        func: () => 6
      }
    },
    in: []
  },

  "source2": {
    id: "source2",
    definition: {
      type: SOURCE,
      in: [],
      out: {
        type: [Number],
        func: () => 8
      }
    },
    in: []
  }
}

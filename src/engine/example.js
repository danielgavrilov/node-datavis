import _ from "lodash";

export const functions = {
  "add": {
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
      fn: (x, y) => x + y
    }
  },
  "max": {
    in: [{
      name: "list",
      type: [Array]
    }],
    out: {
      name: "max",
      type: [Number],
      fn: _.max
    }
  },
  "min": {
    in: [{
      name: "list",
      type: [Array]
    }],
    out: {
      name: "min",
      type: [Number],
      fn: _.min
    }
  },
  "first": {
    in: [{
      name: "list",
      type: [Array]
    }],
    out: {
      name: "first",
      type: [Number],
      fn: _.first
    }
  },
};

export const variables = {
  "width": {
    expression: "960"
  },
  "height": {
    expression: "480"
  },
  "result": {
    __ref: "function1"
  }
};

// TODO are ID's necessary?

export const graph = {

  "var_width": {
    id: "var_width",
    value: 960
  },

  "dataset": {
    id: "dataset",
    definition: {
      in: [],
      out: {
        type: [Array],
        value: [1,6,2,3,6]
      }
    },
    in: []
  },

  "max": {
    id: "max",
    definition: "max",
    in: ["dataset"],
  },

  "min": {
    id: "min",
    definition: "min",
    in: ["dataset"],
  },
}

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
  extent: {
    in: [{
      name: "list",
      type: [Array]
    }],
    out: {
      name: "extent",
      type: [Array],
      fn: (list) => [_.min(list), _.max(list)]
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
    __ref: "var_width"
  },
  "height": {
    __ref: "var_height"
  },
  "result": {
    __ref: "extent"
  }
};

export const graph = {

  "var_width": {
    value: 960
  },

  "var_height": {
    value: 480
  },

  "dataset": {
    value: [1,6,2,3,6]
  },

  "max": {
    definition: "max",
    in: ["dataset"],
  },

  "min": {
    definition: "min",
    in: ["dataset"],
  },

  "extent": {
    definition: "extent",
    in: ["dataset"],
  }
}

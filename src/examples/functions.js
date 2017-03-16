import _ from "lodash";

export default {
  chunk: {
    name: "chunk",
  },
  compact: {
    name: "compact",
  },
  concat: {
    name: "concat",
  },
  difference: {
    name: "difference",
  },
  drop: {
    name: "drop",
  },
  fill: {
    name: "fill",
  },
  findIndex: {
    name: "findIndex",
  },
  first: {
    name: "first",
  },
  flatten: {
    name: "flatten",
  },
  indexOf: {
    name: "indexOf",
  },
  intersection: {
    name: "intersection",
  },
  join: {
    name: "join",
  },
  last: {
    name: "last",
  },
  pull: {
    name: "pull",
  },
  reverse: {
    name: "reverse",
  },
  slice: {
    name: "slice",
  },
  tail: {
    name: "tail",
  },
  take: {
    name: "take",
  },
  union: {
    name: "union",
  },
  uniq: {
    name: "uniq",
  },
  unzip: {
    name: "unzip",
  },
  zip: {
    name: "zip",
  },
  add: {
    name: "add",
    inputs: [{
      name: "x",
      types: [Number],
      required: true
    }, {
      name: "y",
      types: [Number],
      required: true
    }],
    output: {
      name: "sum",
      types: [Number],
      fn: function(x, y) {
        return x + y;
      }
    }
  },
  subtract: {
    name: "subtract",
    inputs: [{
      name: "x",
      types: [Number],
      required: true
    }, {
      name: "y",
      types: [Number],
      required: true
    }],
    output: {
      name: "sum",
      types: [Number],
      fn: function(x, y) {
        return x - y;
      }
    }
  },
  count: {
    name: "count",
    inputs: [{
      name: "array",
      types: [Array],
      required: true
    }],
    output: {
      name: "count",
      types: [Number],
      fn: function(array) {
        return _.count(array);
      }
    }
  },
  min: {
    name: "min",
    inputs: [{
      name: "array",
      types: [Array],
      required: true
    }],
    output: {
      name: "min",
      types: [Number],
      fn: function(array) {
        return _.min(array);
      }
    }
  },
  max: {
    name: "max",
    inputs: [{
      name: "array",
      types: [Array],
      required: true
    }],
    output: {
      name: "max",
      types: [Number],
      fn: function(array) {
        return _.max(array);
      }
    }
  }
};

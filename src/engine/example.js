import _ from "lodash";
import { fromJS } from "immutable";

export default fromJS({

  functions: {
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
      },
      fn: (x, y) => x + y
    },
    "max": {
      in: [{
        name: "list",
        type: [Array]
      }],
      out: {
        name: "max",
        type: [Number],
      },
      fn: _.max
    },
    "min": {
      in: [{
        name: "list",
        type: [Array]
      }],
      out: {
        name: "min",
        type: [Number],
      },
      fn: _.min
    },
    extent: {
      in: [{
        name: "list",
        type: [Array]
      }],
      out: {
        name: "extent",
        type: [Array],
      },
      fn: (list) => [_.min(list), _.max(list)]
    },
    "first": {
      in: [{
        name: "list",
        type: [Array]
      }],
      out: {
        name: "first",
        type: [Number],
      },
      fn: _.first
    },
  },

  variables: {
    "width": {
      __ref: "var_width"
    },
    "height": {
      __ref: "var_height"
    },
    "result": {
      __ref: "extent"
    }
  },

  graph: {
    "var_width": {
      type: "VARIABLE",
      variable: "width",
      value: () => 960,
      visible: false,
      properties: {}
    },
    "var_height": {
      type: "VARIABLE",
      variable: "height",
      expression: "width * 2",
      visible: false,
      properties: {}
    },
    // actually visible variable in computation
    // is a reference to original
    "hash1313": {
      type: "VARIABLE_REFERENCE",
      __ref: "var_height",
      visible: true,
      properties: {
        x: 10,
        y: 10,
      }
    },
    "dataset": {
      type: "VALUE",
      value: () => [1,6,2,3,6],
      visible: true,
      properties: {
        x: 10,
        y: 100,
      }
    },
    "max": {
      type: "FUNCTION",
      definition: "max",
      in: ["dataset"],
    },
    "min": {
      type: "FUNCTION",
      definition: "min",
      in: ["dataset"],
    },
    "extent": {
      type: "FUNCTION",
      definition: "extent",
      in: ["dataset"],
    },
  }

});

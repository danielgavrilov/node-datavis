import { fromJS } from "immutable";

import evaluate from "./evaluate";

import {
  CircularReference
} from "./errors";

it("should follow variable references", () => {

  const program = fromJS({
    functions: {},
    variables: {
      x: { __ref: "var_x" }
    },
    graph: {
      "var_x": {
        __value: 42
      },
    }
  });

  expect(evaluate(program).variables.x).toEqual(42);

});

it("should handle objects and arrays", () => {
  // this test is to check they don't accidentally get converted to Immutable objects

  const program = fromJS({
    functions: {},
    variables: {
      x: { __ref: "var_x" }
    },
    graph: {
      "var_x": {
        __value: null
      },
    }
  }).setIn(["graph", "var_x", "__value"], [1,2,3]);



  expect(evaluate(program).variables.x).toEqual([1,2,3]);

});

it("should evaluate functions", () => {

  const program = fromJS({
    functions: {
      "add": {
        in: [{
          name: "x"
        }, {
          name: "y"
        }],
        out: {
          name: "add"
        },
        fn: (x, y) => x + y
      }
    },
    variables: {
      x: { __ref: "var_x" }
    },
    graph: {
      "var_x": {
        __ref: "added"
      },
      value1: {
        __value: 5
      },
      value2: {
        __value: 6
      },
      "added": {
        definition: "add",
        in: ["value1", "value2"]
      }
    }
  });

  expect(evaluate(program).variables.x).toEqual(11);

});

it("should override variables", () => {

  const program = fromJS({
    functions: {},
    variables: {
      x: { __ref: "var_x" }
    },
    graph: {
      "var_x": {
        __value: 42
      },
    }
  });

  const override = {
    x: 43
  };

  expect(evaluate(program, override).variables.x).toEqual(43);

});

it("should evaluate expressions with overriden variables", () => {

  const program = fromJS({
    functions: {},
    variables: {
      x: { __ref: "var_x" },
      y: { __ref: "var_y" }
    },
    graph: {
      "var_x": {
        __value: 42
      },
      "var_y": {
        expression: "x + x"
      }
    }
  });

  const override = {
    x: 43
  };

  expect(evaluate(program, override).variables.y).toEqual(86);

});

it("should detect circular references in expressions", () => {

  const program = fromJS({
    functions: {},
    variables: {
      x: { __ref: "var_x" },
      y: { __ref: "var_y" }
    },
    graph: {
      "var_x": {
        expression: "y"
      },
      "var_y": {
        expression: "x + x"
      }
    }
  });

  expect(() => {
    evaluate(program)
  }).toThrow(CircularReference);

});

it("should detect circular references in graphs", () => {

  const program = fromJS({
    functions: {
      test: {
        in: [{}],
        out: {},
        fn: () => null
      }
    },
    variables: {
      x: {
        __ref: "var_x"
      }
    },
    graph: {
      "var_x": {
        definition: "test",
        in: ["var_y"]
      },
      "var_y": {
        definition: "test",
        in: ["var_x"]
      }
    }
  });

  expect(() => {
    evaluate(program)
  }).toThrow(CircularReference);

});

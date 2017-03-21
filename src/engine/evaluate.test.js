import Immutable from "immutable";

import evaluate from "./evaluate";

import {
  MismatchingArguments,
  UndefinedVariable,
  UndefinedFunction,
  CircularReference
} from "./errors";

it("should follow variable references", () => {

  const program = Immutable.fromJS({
    functions: {},
    variables: {
      x: { __ref: "var_x" }
    },
    graph: {
      "var_x": {
        value: () => 42
      },
    }
  });

  expect(evaluate(program).variables.x).toEqual(42);

});

it("should handle objects and arrays", () => {
  // this test is to check they don't accidentally get converted to Immutable objects

  const program = Immutable.fromJS({
    functions: {},
    variables: {
      x: { __ref: "var_x" }
    },
    graph: {
      "var_x": {
        value: () => [1,2,3]
      },
    }
  });

  expect(evaluate(program).variables.x).toEqual([1,2,3]);

});

it("should evaluate functions", () => {

  const program = Immutable.fromJS({
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
        value: () => 5
      },
      value2: {
        value: () => 6
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

  const program = Immutable.fromJS({
    functions: {},
    variables: {
      x: { __ref: "var_x" }
    },
    graph: {
      "var_x": {
        value: () => 42
      },
    }
  });

  const results = {
    variables: {
      x: 43
    }
  };

  expect(evaluate(program, results).variables.x).toEqual(43);

});

it("should evaluate expressions with overriden variables", () => {

  const program = Immutable.fromJS({
    functions: {},
    variables: {
      x: { __ref: "var_x" },
      y: { __ref: "var_y" }
    },
    graph: {
      "var_x": {
        value: () => 42
      },
      "var_y": {
        expression: "x + x"
      }
    }
  });

  const results = {
    variables: {
      x: 43
    }
  };

  expect(evaluate(program, results).variables.y).toEqual(86);

});

it("should detect circular references", () => {

  const program = Immutable.fromJS({
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

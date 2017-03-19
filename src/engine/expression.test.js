import {
  evaluate,
  parse,
  extractVariables
} from "./expression";


describe("evaluate", () => {

  it("should evaluate simple functions", () => {
    expect(evaluate("x + y", { x: 1, y: 2 })).toEqual(3);
  });

  it("should pass undefined for undefined variables", () => {
    expect(evaluate("x === undefined", {})).toEqual(true);
  });

});


describe("parse", () => {

  it("should create a function", () => {
    const { fn } = parse("x + y");
    expect(fn(3,4)).toEqual(7);
  });

  it("should handle reserved words", () => {
    const { fn } = parse("x && true");
    expect(fn(false)).toEqual(false);
  });

});


describe("extractVariables", () => {

  it("should extract identifiers", () => {
    expect(extractVariables("x + y")).toEqual(["x", "y"]);
  });

  it("should ignore duplicates", () => {
    expect(extractVariables("x + x")).toEqual(["x"]);
  });

  it("should ignore reserved words", () => {
    expect(extractVariables("function + class + x")).toEqual(["x"]);
  });

});

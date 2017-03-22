import {
  evaluate,
  compile,
  extractVariables
} from "./expression";


describe("evaluate", () => {

  it("should evaluate simple functions", () => {
    expect(evaluate("x + y", { x: 1, y: 2 })).toEqual(3);
  });

  it("should pass undefined for undefined variables", () => {
    expect(evaluate("x === undefined", {})).toEqual(true);
  });

  it("should accept multiple scopes", () => {
    expect(evaluate("x + y + z", { x: 1 }, { y: 1 }, { z: 1 })).toEqual(3);
  });

  it("should consider scopes in order", () => {
    expect(evaluate("x + y", { x: 1 }, { x: 2, y: 1 })).toEqual(2);
  });

});


describe("compile", () => {

  it("should create a function", () => {
    const { fn } = compile("x + y");
    expect(fn(3,4)).toEqual(7);
  });

  it("should handle reserved words", () => {
    const { fn } = compile("x && true");
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

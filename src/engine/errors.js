export class CircularReference extends Error {
  constructor({ id }) {
    super("Circular reference on id: " + id);
    this.id = id;
  }
}

export class UndefinedVariable extends Error {
  constructor({ name }) {
    super("Undefined variable: " + name);
    this.name = name;
  }
}

export class MismatchingArguments extends Error {
  constructor({ name, expected, got }) {
    super("Mismatching number of arguments for function '" + name + "' expected: " + expected + ", got: " + got);
    this.name = name;
    this.expected = expected;
    this.got = got;
  }
}

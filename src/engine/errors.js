export class CircularReference extends Error {
  constructor({ id }) {
    super("Circular reference on id: " + id);
    this.id = id;
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

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

export class UndefinedFunction extends Error {
  constructor({ name }) {
    super("Undefined function: " + name);
    this.name = name;
  }
}

export class InexistingPicture extends Error {
  constructor({ pictureId }) {
    super("Inexisting picture: " + pictureId);
    this.pictureId = pictureId;
  }
}

export class InvalidScope extends Error {
  constructor({ name, type }) {
    super("Variable '" + name + "' is not a valid scope variable. Expected an array, but got: " + type);
    this.name = name;
    this.type = type;
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

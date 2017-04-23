import parameters from "./parameters";

it("should evaluate simple overriding variables", () => {

    const override = {
      "x": "width"
    };

    const variables = {
      "width": 42
    };

    const scopes = [];

    expect(parameters(override, variables, scopes)).toEqual([
      { "x": 42 }
    ]);

});


it("should evaluate scopes", () => {

    const override = {
      "x": "width + x + y"
    };

    const variables = {
      "width": 42
    };

    const scopes = [
      { x: 1, y: 1 },
      { x: 2, y: 2 }
    ];

    expect(parameters(override, variables, scopes)).toEqual([
      { "x": 44 },
      { "x": 46 }
    ]);

});

import parameters from "./parameters";

// function parameters(override, variables, scopes=[]) {
//   if (scopes.length == 0) {
//     scopes = [{}];
//   }
//   return scopes.map((scope) => {
//     return _.mapValues(override, (expression) => {
//       return evaluate(expression, scope, variables);
//     })
//   });
// }

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

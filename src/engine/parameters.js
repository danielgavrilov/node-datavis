import _ from "lodash";

import { evaluate } from "./expression";

export default function parameters(override, variables, scopes=[]) {
  if (scopes.length === 0) {
    scopes = [{}];
  }
  return scopes.map((scope) => {
    return _.mapValues(override, (expression) => {
      return evaluate(expression, scope, variables);
    })
  });
}

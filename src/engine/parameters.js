import _ from "lodash";

import { evaluate } from "./expression";

export default function parameters(override, variables, scopes=[]) {
  if (scopes.length === 0) {
    scopes = [{}];
  }
  return scopes.map((scope) => {
    // omit keys that have value of empty string
    const filteredOverride = _.omitBy(override, (value) => value === "");
    return _.mapValues(filteredOverride, (expression) => {
      return evaluate(expression, scope, variables);
    })
  });
}

/* eslint-disable no-new-func */

import _ from "lodash";
import { reIdentifier, reReserved } from "./regex";

export function evaluate(jsString, ...scopes) {
  const { fn, params } = parse(jsString);
  const args = params.map((param) => {
    for (const scope of scopes) {
      if (scope[param] !== undefined) {
        return scope[param];
      }
    }
  });
  return fn(...args);
}

export function parse(jsString) {
  const params = extractVariables(jsString);
  return {
    fn: new Function(...params, "return " + jsString),
    params
  }
}

export function extractVariables(jsString) {
  const variables = [];
  let x;
  do {
    x = reIdentifier.exec(jsString);
    if (x != null && !reReserved.test(x[0])) {
      variables.push(x[0]);
    }
  } while (x != null);
  return _.uniq(variables);
}

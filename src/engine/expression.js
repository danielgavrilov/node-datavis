/* eslint-disable no-new-func */

import _ from "lodash";
import { reIdentifier, reReserved } from "./regex";

export function evaluate(jsString, ...scopes) {
  const { fn, params } = compile(jsString);
  const args = params.map((param) => {
    for (const scope of scopes) {
      if (scope[param] !== undefined) {
        return scope[param];
      }
    }
    return undefined;
  });
  return fn(...args);
}

export function compile(jsString) {
  const params = extractVariables(jsString);
  return {
    fn: new Function(...params, "return " + jsString),
    params
  }
}

export function extractVariables(jsString) {
  jsString = removeStringTokens(jsString);
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

// Possible bug: ' inside " string
function removeStringTokens(string) {
  let result = string;
  result = removeTokensBetween(result, '"')
  result = removeTokensBetween(result, "'");
  return result;
}

function removeTokensBetween(string, char) {

  let quotes = [],
      result = "";

  for (let i = 0; i < string.length; i++) {
    if (string[i] === char) {
      quotes.push(i);
    }
  }

  quotes = quotes.filter((index) => {
    return index > 0 || string[index-1] !== "\\";
  });

  quotes.unshift(0);

  let ranges = _.chunk(quotes, 2).filter((d) => d.length === 2);

  if (ranges.length === 0) return string;

  ranges.forEach(([start, end]) => {
    result += string.substring(start, end);
  });

  return result;
}

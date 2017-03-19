import _ from "lodash";

import {
  MismatchingArguments,
  UndefinedVariable,
  CircularReference
} from "./errors";

import { parse as parseExpr } from "./expression";

export default function evaluate({ functions, variables, graph }, results={}) {

  results.variables = results.variables || {};
  results.graph     = results.graph     || {};

  _.keys(variables).forEach((variable) => {
    const nodeId = variables[variable].__ref;
    results.variables[variable] = evaluateNode(nodeId, { functions, variables, graph }, results);
  });

  return results;
}

function evaluateNode(nodeId, { functions, variables, graph }, results={}) {

  const item = graph[nodeId];
  let result = results.graph[nodeId];

  if (result != null) {

    // do not evaluate if processing, circular reference
    if (result.done === false) {
      throw new CircularReference({ id: nodeId });

    // do not evaluate already evaluated
    } else if (result.done === true) {
      return result.value;
    }

  // populate with default if no result recorded
  } else {
    result = results.graph[nodeId] = { done: false };
  }

  const { value, definition, expression, __ref } = item;

  let returnValue;

  // constant
  if (value !== undefined) {
    // we are done
    returnValue = value;

  // reference to a node
  } else if (__ref != null) {
    returnValue = evaluateNode(__ref, { functions, variables, graph }, results);

  // function node
  } else if (definition != null) {

    const def = functions[definition];

    if (def == null) {
      throw new Error("Function definition '" + definition + "' does not exist.");
    }

    // detect mismatching argument lengths
    // TODO detect type mismatches? how would warnings be stored?
    if (def.in.length !== item.in.length) {
      throw new MismatchingArguments({
        name: definition,
        expected: def.in.length,
        got: item.in.length
      });
    }

    const fn = def.out && def.out.fn;
    if (fn == null) {
      throw new Error("Function definition '" + definition + "' does not have a function body.")
    }

    const args = item.in.map((id) => evaluateNode(id, { functions, variables, graph }, results));
    returnValue = fn(...args);

  // expression containing variables
  } else if (expression != null) {
    const { fn, params } = parseExpr(expression);
    const args = params.map((variable) => {
      if (variables[variable] != null) {
        return evaluateNode(variables[variable].__ref, { functions, variables, graph }, results);
      } else {
        throw new UndefinedVariable({ name: variable });
      }
    });
    returnValue = fn(...args);

  } else {
    throw new Error("evaluateNode couldn't recognise passed item. This shouldn't happen. IT'S ALL HOPELESS.");
  }

  result.done = true;
  result.value = returnValue;

  return returnValue;
}

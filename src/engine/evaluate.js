import _ from "lodash";

import {
  MismatchingArguments,
  UndefinedVariable,
  UndefinedFunction,
  CircularReference
} from "./errors";

import { parse as parseExpr } from "./expression";

export default function evaluate(program, results={}) {

  results.variables = results.variables || {};
  results.graph     = results.graph     || {};

  const functions = program.get("functions"),
        variables = program.get("variables"),
        graph = program.get("graph");

  variables.entrySeq().forEach(([variable, node]) => {
    if (results.variables[variable] === undefined) {
      results.variables[variable] = evaluateNode(node.get("__ref"), { functions, variables, graph }, results);
    }
  });

  return results;
}

function evaluateNode(nodeId, { functions, variables, graph }, results={}) {

  const item = graph.get(nodeId);
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

  const value = item.get("value"),
        definition = item.get("definition"),
        expression = item.get("expression"),
        __ref = item.get("__ref");

  let returnValue;

  // constant
  if (value !== undefined) {
    // we are done
    returnValue = value();

  // reference to a node
  } else if (__ref != null) {
    returnValue = evaluateNode(__ref, { functions, variables, graph }, results);

  // function node
  } else if (definition != null) {

    const def = functions.get(definition);

    if (def == null) {
      throw new UndefinedFunction({ name: definition });
    }

    // detect mismatching argument lengths
    // TODO detect type mismatches? how would warnings be stored?

    const defIn = def.get("in").count();
    const itemIn = def.get("in").count();

    if (defIn !== itemIn) {
      throw new MismatchingArguments({
        name: definition,
        expected: defIn,
        got: itemIn
      });
    }

    const fn = def.get("fn");

    if (fn == null) {
      throw new Error("Function definition '" + definition + "' does not have a function body.")
    }

    const args = item.get("in")
      .toJS()
      .map((id) => evaluateNode(id, { functions, variables, graph }, results));

    returnValue = fn(...args);

  // expression containing variables
  } else if (expression != null) {
    const { fn, params } = parseExpr(expression);
    const args = params.map((variable) => {
      if (results.variables[variable] !== undefined) {
        return results.variables[variable];
      }
      const node = variables.get(variable);
      if (node != null) {
        return evaluateNode(node.get("__ref"), { functions, variables, graph }, results);
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

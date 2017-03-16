import _ from "lodash";

import { MismatchingArguments, CircularReference } from "./errors";

export function evaluate({ functions, variables, graph }, results={}) {

  results.variables = {
    "width": 960
  };

  results.graph = {
    "ref": {
      processing: true,
      value: 42
    }
  };

}

function evaluateNode(nodeId, { functions, variables, graph }, results={}) {

  const item = graph[nodeId];
  let result = results.graph[nodeId];

  if (result != null) {

    // do not evaluate if processing, circular reference
    if (result.processing) {
      throw new CircularReference({ id: nodeId });

    // do not evaluate already evaluated
    } else if (result.value != null) {
      return result.value;
    }

  // populate with default if no result recorded
  } else {
    result = results.graph[nodeId] = { processing: true };
  }

  const { value, definition, __ref } = item;

  let returnValue;

  // constant
  if (value != null) {
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

    return

  } else {
    throw new Error("evaluateNode couldn't recognise passed item. This shouldn't happen. IT'S ALL HOPELESS.");
  }


  result.processing = false;
  return returnValue;


  // make sure all input nodes have a result
  node.in.forEach((key) => {
    const inputNode = graph[key];
    evaluate(inputNode, graph, results);
  });

  // then calculate current node
  const args = node.in.map((key) => results[key].value);
  results[node.key] = { value: node.definition.out.func(...args) };
}

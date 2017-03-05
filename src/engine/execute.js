import _ from "lodash";

function execute(graph) {

  let results = {};

  _.values(graph).forEach((node) => {
    evaluate(node, graph, results);
  });

  return results;
}

function evaluate(node, graph, results) {

  // do not evaluate already evaluated
  if (results[node.key] != null) {
    return;
  }

  // make sure all input nodes have a result
  node.in.forEach((key) => {
    const inputNode = graph[key];
    evaluate(inputNode, graph, results);
  });

  // then calculate current node
  const args = node.in.map((key) => results[key].value);
  results[node.key] = { value: node.definition.out.func(...args) };
}

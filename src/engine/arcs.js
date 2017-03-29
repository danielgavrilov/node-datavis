function isVisible(graph, from, to) {
  const source = graph.get(from);
  const target = graph.get(to);
  return source.get("visible")
      && target.get("visible");
}

export default function(graph) {

  const arcs = [];

  graph.forEach((node, targetNodeId) => {
    const sourceIds = node.get("in");
    if (sourceIds && sourceIds.count() > 0) {
      sourceIds.forEach((sourceNodeId, argumentIndex) => {
        if (isVisible(graph, sourceNodeId, targetNodeId)) {
          arcs.push({
            from: sourceNodeId,
            to: targetNodeId,
            argumentIndex
          });
        }
      });
    }
  });

  return arcs;
}

import getArcs from "../engine/arcs";
import connectorLocation from "./connector-location";

export function getConnectors(graph) {
  return graph
    .filter((node) => node.get("visible"))
    .map((node, id) => {
      const type = node.get("type");
      const properties = node.get("properties").toJS();
      const inputConnectors = node.get("")
    }).toJS();
}

export function arcsAndConnectors(graph) {
  const abstractArcs = getArcs(graph);
  const connectors = [];
  const arcs = [];
  return {
    arcs,
    connectors
  }
}

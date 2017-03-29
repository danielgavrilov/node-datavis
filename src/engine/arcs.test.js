import { fromJS } from "immutable";

import arcs from "./arcs";


it("should compute an arc between two nodes in a graph", () => {

  const graph = fromJS({
    "a": {
      visible: true,
      in: []
    },
    "b": {
      visible: true,
      in: ["a"]
    }
  });

  const allArcs = arcs(graph);

  expect(allArcs.length).toEqual(1);

  expect(allArcs).toContainEqual({
    "from": "a",
    "to": "b",
    "argumentIndex": 0
  });

});


it("should compute arcs on a more complex graph", () => {

  const graph = fromJS({
    "a": {
      visible: true,
      in: []
    },
    "b": {
      visible: true,
      in: ["a"]
    },
    "c": {
      visible: true,
      in: ["a", "b"]
    },
    "d": {
      visible: true,
      in: ["a", "c"]
    }
  });

  const allArcs = arcs(graph);

  expect(allArcs.length).toEqual(5);

  expect(allArcs).toContainEqual({
    "from": "a",
    "to": "b",
    "argumentIndex": 0
  });

  expect(allArcs).toContainEqual({
    "from": "a",
    "to": "c",
    "argumentIndex": 0
  });

  expect(allArcs).toContainEqual({
    "from": "a",
    "to": "c",
    "argumentIndex": 0
  });

  expect(allArcs).toContainEqual({
    "from": "b",
    "to": "c",
    "argumentIndex": 1
  });

  expect(allArcs).toContainEqual({
    "from": "a",
    "to": "d",
    "argumentIndex": 0
  });

  expect(allArcs).toContainEqual({
    "from": "c",
    "to": "d",
    "argumentIndex": 1
  });

});


it("should filter out invisible arcs", () => {

  const graph = fromJS({
    "a": {
      visible: true,
      in: []
    },
    "b": {
      visible: true,
      in: ["a"]
    },
    "c": {
      visible: false,
      in: ["a"]
    }
  });

  const allArcs = arcs(graph);

  expect(allArcs.length).toEqual(1);

  expect(allArcs).toContainEqual({
    "from": "a",
    "to": "b",
    "argumentIndex": 0
  });

});

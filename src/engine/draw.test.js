import { fromJS } from "immutable";
import { buildPictureSpec } from "./draw";

it("should draw a primitive in a picture", () => {

  const subpictures = fromJS({
    test: {
      functions: {},
      variables: {},
      graph: {},
      subpictures: [{
        picture: "rect",
        override: {
          x: "0",
          y: "0",
          width: "50",
          height: "50"
        }
      }]
    }
  });

  expect(buildPictureSpec(subpictures, "test")).toContainEqual({
    "picture": "rect",
    "collection": [{
      "instance": "rect",
      "params": {
        "height": 50,
        "width": 50,
        "x": 0,
        "y": 0
      },
    }],
  });

});

it("should draw primitives from scope in a picture", () => {

  const subpictures = fromJS({
    test: {
      functions: {},
      variables: {
        data: {
          __ref: "data"
        }
      },
      graph: {
        "data": {
          value: null // fill
        }
      },
      subpictures: [{
        picture: "rect",
        scope: "data",
        override: {
          x: "x",
          y: "y",
          width: "50",
          height: "50"
        }
      }]
    }
  }).setIn(["test", "graph", "data", "value"], [{
    x: 0,
    y: 0
  }, {
    x: 10,
    y: 10
  }]);

  const result = buildPictureSpec(subpictures, "test");

  expect(result[0].collection).toContainEqual({
    "instance": "rect",
    "params": {
      "x": 0,
      "y": 0,
      "width": 50,
      "height": 50
    },
  });

  expect(result[0].collection).toContainEqual({
    "instance": "rect",
    "params": {
      "x": 10,
      "y": 10,
      "width": 50,
      "height": 50
    },
  });

});

it("should draw multiple primitives from scope in a picture", () => {

  const subpictures = fromJS({
    test: {
      functions: {},
      variables: {
        data: {
          __ref: "data"
        }
      },
      graph: {
        "data": {
          value: null // fill
        }
      },
      subpictures: [{
        picture: "rect",
        scope: "data",
        override: {
          x: "x",
          y: "y",
          width: "50",
          height: "50"
        }
      }, {
        picture: "circle",
        scope: "data",
        override: {
          x: "x",
          y: "y",
          width: "50",
          height: "50"
        }
      }]
    }
  }).setIn(["test", "graph", "data", "value"], [{
    x: 0,
    y: 0
  }, {
    x: 10,
    y: 10
  }]);

  const result = buildPictureSpec(subpictures, "test");

  expect(result.length).toEqual(2);

  expect(result[0].picture).toEqual("rect");

  expect(result[0].collection[0]).toEqual({
    "instance": "rect",
    "params": {
      "x": 0,
      "y": 0,
      "width": 50,
      "height": 50
    },
  });

  expect(result[0].collection[1]).toEqual({
    "instance": "rect",
    "params": {
      "x": 10,
      "y": 10,
      "width": 50,
      "height": 50
    },
  });

});

it("should draw nested subpictures", () => {

  const subpictures = fromJS({
    test: {
      functions: {},
      variables: {
        data: {
          __ref: "data"
        },
      },
      graph: {
        "data": {
          value: null // fill
        }
      },
      subpictures: [{
        picture: "nested",
        override: {
          "data": "data"
        }
      }]
    },
    nested: {
      functions: {
        map_plusone: {
          in: [{
            name: "test"
          }],
          out: {
            name: "test-out"
          },
          fn: (list) => list.map(({ x, y }) => ({ x: x+1, y: y+1 }))
        }
      },
      variables: {
        data: {
          __ref: "data"
        },
        modified: {
          __ref: "modified"
        }
      },
      graph: {
        "data": {
          value: null
        },
        "modified": {
          definition: "map_plusone",
          in: ["data"]
        }
      },
      subpictures: [{
        picture: "rect",
        scope: "modified",
        override: {
          x: "x",
          y: "y",
          width: "50",
          height: "50"
        }
      }]
    }
  }).setIn(["test", "graph", "data", "value"], [{
    x: 0,
    y: 0
  }, {
    x: 10,
    y: 10
  }]);

  const result = buildPictureSpec(subpictures, "test");

  expect(result[0].picture).toEqual("nested");
  expect(result[0].collection.length).toEqual(1);

  expect(result[0].collection[0].instance).toEqual("nested");
  expect(result[0].collection[0].children[0].collection).toContainEqual({
    "instance": "rect",
    "params": {
      "height": 50,
      "width": 50,
      "x": 1,
      "y": 1
    }
  });
  expect(result[0].collection[0].children[0].collection).toContainEqual({
    "instance": "rect",
    "params": {
      "height": 50,
      "width": 50,
      "x": 11,
      "y": 11
    },
  });

});

it("should override variables in nested picture", () => {

});

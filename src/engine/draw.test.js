import { fromJS } from "immutable";

import { buildPictureSpec } from "./draw";
import evaluate from "./evaluate";

it("should draw a primitive in a picture", () => {

  const subpictures = fromJS({
    test: {
      functions: {},
      variables: {},
      graph: {},
      subpictures: {
        "a": {
          picture: "rect",
          override: {
            x: "0",
            y: "0",
            width: "50",
            height: "50"
          }
        },
      },
      subpicturesOrder: ["a"]
    }
  });

  const { variables } = evaluate(subpictures.get("test"));
  const result = buildPictureSpec(subpictures, "test", variables);

  expect(result.children).toContainEqual({
    "children": [{
      "params": {
        "fill": "rgba(0,0,0,.3)",
        "height": 50,
        "stroke": "",
        "strokeWidth": "",
        "width": 50,
        "x": 0,
        "y": 0
      },
      "picture": "rect",
      "type": "rect"
    }],
    "params": {},
    "picture": "rect",
    "subpicture": "a",
    "type": "group"
  });

});

// it("should draw primitives from scope in a picture", () => {
//
//   const subpictures = fromJS({
//     test: {
//       functions: {},
//       variables: {
//         data: {
//           __ref: "data"
//         }
//       },
//       graph: {
//         "data": {
//           __value: null // fill
//         }
//       },
//       subpictures: {
//         "a": {
//           picture: "rect",
//           scope: "data",
//           override: {
//             x: "x",
//             y: "y",
//             width: "50",
//             height: "50"
//           }
//         }
//       },
//       subpicturesOrder: ["a"]
//     }
//   }).setIn(["test", "graph", "data", "__value"], [{
//     x: 0,
//     y: 0
//   }, {
//     x: 10,
//     y: 10
//   }]);
//
//   const { variables } = evaluate(subpictures.get("test"));
//   const result = buildPictureSpec(subpictures, "test", variables);
//
//   expect(result[0].children).toContainEqual({
//     "instance": "rect",
//     "params": {
//       "x": 0,
//       "y": 0,
//       "width": 50,
//       "height": 50
//     },
//   });
//
//   expect(result[0].children).toContainEqual({
//     "instance": "rect",
//     "params": {
//       "x": 10,
//       "y": 10,
//       "width": 50,
//       "height": 50
//     },
//   });
//
// });
//
// it("should draw multiple primitives from scope in a picture", () => {
//
//   const subpictures = fromJS({
//     test: {
//       functions: {},
//       variables: {
//         data: {
//           __ref: "data"
//         }
//       },
//       graph: {
//         "data": {
//           __value: null // fill
//         }
//       },
//       subpictures: {
//         "a": {
//           picture: "rect",
//           scope: "data",
//           override: {
//             x: "x",
//             y: "y",
//             width: "50",
//             height: "50"
//           }
//         },
//         "b": {
//           picture: "circle",
//           scope: "data",
//           override: {
//             x: "x",
//             y: "y",
//             width: "50",
//             height: "50"
//           }
//         }
//       },
//       subpicturesOrder: ["a", "b"]
//     }
//   }).setIn(["test", "graph", "data", "__value"], [{
//     x: 0,
//     y: 0
//   }, {
//     x: 10,
//     y: 10
//   }]);
//
//   const { variables } = evaluate(subpictures.get("test"));
//   const result = buildPictureSpec(subpictures, "test", variables);
//
//   expect(result.length).toEqual(2);
//
//   expect(result[0].picture).toEqual("rect");
//
//   expect(result[0].children[0]).toEqual({
//     "instance": "rect",
//     "params": {
//       "x": 0,
//       "y": 0,
//       "width": 50,
//       "height": 50
//     },
//   });
//
//   expect(result[0].children[1]).toEqual({
//     "instance": "rect",
//     "params": {
//       "x": 10,
//       "y": 10,
//       "width": 50,
//       "height": 50
//     },
//   });
//
// });
//
// it("should draw nested subpictures", () => {
//
//   const subpictures = fromJS({
//     test: {
//       functions: {},
//       variables: {
//         data: {
//           __ref: "data"
//         },
//       },
//       graph: {
//         "data": {
//           __value: null // fill
//         }
//       },
//       subpictures: {
//         "a": {
//             picture: "nested",
//             override: {
//               "data": "data"
//             }
//         }
//       },
//       subpicturesOrder: ["a"]
//     },
//     nested: {
//       functions: {
//         map_plusone: {
//           in: [{
//             name: "test"
//           }],
//           out: {
//             name: "test-out"
//           },
//           fn: (list) => list.map(({ x, y }) => ({ x: x+1, y: y+1 }))
//         }
//       },
//       variables: {
//         data: {
//           __ref: "data"
//         },
//         modified: {
//           __ref: "modified"
//         }
//       },
//       graph: {
//         "data": {
//           __value: null
//         },
//         "modified": {
//           definition: "map_plusone",
//           in: ["data"]
//         }
//       },
//       subpictures: {
//         "a": {
//           picture: "rect",
//           scope: "modified",
//           override: {
//             x: "x",
//             y: "y",
//             width: "50",
//             height: "50"
//           }
//         }
//       },
//       subpicturesOrder: ["a"]
//     }
//   }).setIn(["test", "graph", "data", "__value"], [{
//     x: 0,
//     y: 0
//   }, {
//     x: 10,
//     y: 10
//   }]);
//
//   const { variables } = evaluate(subpictures.get("test"));
//   const result = buildPictureSpec(subpictures, "test", variables);
//
//   expect(result).toBe(0);
//
//   expect(result[0].picture).toEqual("nested");
//   expect(result[0].children.length).toEqual(1);
//
//   expect(result[0].children[0].instance).toEqual("nested");
//   expect(result[0].children[0].children[0].children).toContainEqual({
//     "instance": "rect",
//     "params": {
//       "height": 50,
//       "width": 50,
//       "x": 1,
//       "y": 1
//     }
//   });
//   expect(result[0].children[0].children[0].children).toContainEqual({
//     "instance": "rect",
//     "params": {
//       "height": 50,
//       "width": 50,
//       "x": 11,
//       "y": 11
//     },
//   });
//
// });

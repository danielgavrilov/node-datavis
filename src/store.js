const VALUE_TYPES = [
  Boolean,
  Number,
  Array,
  Date,
  Object,
]

const ANY_TYPE = VALUE_TYPES;

const MODES = "none"
            | "dragging"   // either variable, node or picture
            | "connecting" // a node
            | "selected";  // a node or picture

const DRAGGING_TYPE = "variable"
                    | "node"
                    | "connector"
                    | "picture"
                    | "computation-graph-canvas"
                    | "picture-canvas"
                    | "resize-functions-pane"
                    | "resize-computation-graph-pane";

const nodeState = {
  x: 0,
  y: 0,
  showOutput: true || false
}

export default {

  editor: {

    "picture": "identifier",
    "mode": MODES,
    "draggingType": DRAGGING_TYPE,

    "highlight": {},

    // separate this.state?
    "picturesPane": {

    },

    // function pane this.state? https://github.com/reactjs/redux/issues/1287
    "functionsPane": {
      "search": ""
    },

    // computation graph this.state?
    "computationPane": {
      "selected": {
        type: "node" | "connector",
        id: "id"
      }
    },

    "picturePane": {

    },

  },

  "pictures": {

  },

  nodes: {
    "add": {
      definition: "add",
      inputs: ["a"],
    }
  },

  results: {

  }

}

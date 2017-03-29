const VALUE_TYPES = [
  Boolean,
  Number,
  Array,
  Date,
  Object,
  Function
]

const ANY_TYPE = VALUE_TYPES;

const MODE = null
           || "dragging"
           || "connecting";

const DRAG_TYPE = "variable" // into picture OR expression (which can be in graph, variables or inspector)
               || "node"
               || "connector"
               || "picture"
               || "subpicture" // reodering subpictures
               || "pan"
               || "resize-pane";

const DRAG_ITEM = String // variable name OR nodeId OR picture
               || [{ // coming out from
                    node: String,
                    index: Number
                  }, { // going into
                    node: String,
                    index: Number
                  }]

const HIGHLIGHT_TYPE = "variable"
                    || "picture";

const HIGHLIGHT_ITEM = String // variable name
                    || Number; // picture index

const SELECTED_TYPE = "node"
                   || "arc";

const SELECTED_ITEM = null;

export default {

  editor: {

    pictureId: String,
    mode: MODE,

    drag: {
      type: null || DRAG_TYPE,
      item: null || DRAG_ITEM
    },

    highlight: {
      type: null || HIGHLIGHT_TYPE,
      item: null || HIGHLIGHT_ITEM // variable name
    },

    picturesPane: {
      list: [String] // array of pictureIds
    },

    // function pane this.state? https://github.com/reactjs/redux/issues/1287
    functionsPane: {
      search: null || String
    },

    // computation graph this.state?
    computationPane: {
      selected: {
        type: "node" | "connector",
        id: "id"
      }
    },

    picturePane: {
      selected: Number
    },

  },

  pictures: {
    pictureId: {
      functions: {},
      variables: {},
      graph: {},
      subpictures: {},
      subpicturesOrder: [], // top to bottom
      preview: {} // react
    }
  },

}

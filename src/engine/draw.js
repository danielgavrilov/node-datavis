

function insert({ picture, override, context }) {

}

const picture = {
  functions: {},
  graph: {},
  variables: {},
  pictures: [{
    // override variables
    override: {
      "x": "width + height",
      "width": "960"
    },
    context: null || "variable-name",
    picture: "identifier",
  }, {
    override: {
      "x": "width",
    },
    context: "array",
    picture: "rect"
  }]
}

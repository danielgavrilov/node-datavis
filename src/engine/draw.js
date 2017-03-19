

function generate({ picture, override, scope }) {

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
    scope: null || "variable-name",
    picture: "bar-chart",
  }, {
    override: {
      "x": "width",
    },
    scope: "array",
    picture: "rect"
  }]
}

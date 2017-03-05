export default [
  {
    name: "add",
    inputs: [{
      name: "x",
      types: [Number],
      required: true
    }, {
      name: "y",
      types: [Number],
      required: true
    }],
    output: {
      name: "sum",
      types: [Number],
      function: function(x, y) {
        return x + y;
      }
    }
  },
  {
    name: "subtract",
    inputs: [{
      name: "x",
      types: [Number],
      required: true
    }, {
      name: "y",
      types: [Number],
      required: true
    }],
    output: {
      name: "sum",
      types: [Number],
      function: function(x, y) {
        return x - y;
      }
    }
  }
];

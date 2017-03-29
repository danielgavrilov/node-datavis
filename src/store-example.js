import { fromJS } from "immutable";

export default fromJS({

  editor: {

    pictureId: "first"

  },

  pictures: {
    "first": {
      functions: {
        "test": {
          name: "test"
        }
      },
      variables: {},
      graph: {},
      subpictures: {},
      subpicturesOrder: [], // top to bottom
      preview: {} // react
    }
  },

});

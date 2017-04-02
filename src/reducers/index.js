import { Map } from "immutable";

import { SELECT_PICTURE } from "../actions";

export default function(state=Map(), action) {
  switch (action.type) {
    case SELECT_PICTURE:
      return state.setIn(["editor", "pictureId"], action.pictureId);
    default:
      return state;
  }
}

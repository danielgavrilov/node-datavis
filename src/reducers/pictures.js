import {
  SELECT_PICTURE,
  SELECT_SUBPICTURE
} from "../actions";

export default function(state=Map(), action) {
  switch (action.type) {
    case SELECT_PICTURE:
      return state;
    case SELECT_SUBPICTURE:
      return state;
    default:
      return state;
  }
}

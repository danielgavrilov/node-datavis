import {
  SELECT_PICTURE,
  SELECT_SUBPICTURE
} from "../actions";

export default function(state=Map(), action) {
  switch (action.type) {
    case SELECT_PICTURE:
      return state.setIn(["pictureId"], action.pictureId)
                  .setIn(["computationPane", "selected", "type"], null)
                  .setIn(["computationPane", "selected", "item"], null)
                  .setIn(["subpicturesPane", "selected"], null)
    case SELECT_SUBPICTURE:
      return state.setIn(["subpicturesPane", "selected"], action.subpictureId);
    default:
      return state;
  }
}

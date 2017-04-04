import { has } from "lodash";

import { InexistingPicture } from "../engine/errors";
import primitives from "../pictures/primitives";

export function currentPicture(state) {
  const pictureId = state.getIn(["editor", "pictureId"]);
  return state.getIn(["pictures", pictureId]);
}

export function getPicture(state, pictureId) {
  const pictures = state.get("pictures");
  if (pictures.has(pictureId)) {
    return pictures.get(pictureId);
  } else if (has(primitives, pictureId)) {
    return primitives[pictureId].picture;
  } else {
    throw new InexistingPicture({ pictureId });
  }
}

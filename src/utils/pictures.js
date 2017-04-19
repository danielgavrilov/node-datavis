import { has, curry } from "lodash";

import { InexistingPicture } from "../engine/errors";
import primitives from "../pictures/primitives";

export const isPrimitive = curry(has)(primitives);

export function currentPictureId(state) {
  return state.getIn(["editor", "pictureId"])
}

export function currentSubpictureId(state) {
  return state.getIn(["editor", "inspectorPane", "subpictureId"])
}

export function currentPicture(state) {
  const pictureId = currentPictureId(state);
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

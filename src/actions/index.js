/*
 * action types
 */

export const SELECT_PICTURE = "SELECT_PICTURE";
export const SELECT_SUBPICTURE = "SELECT_SUBPICTURE";

/*
 * action creators
 */

export function selectPicture(pictureId) {
  return {
    type: SELECT_PICTURE,
    pictureId
  }
}

export function selectSubpicture(subpictureId) {
  return {
    type: SELECT_SUBPICTURE,
    subpictureId
  }
}

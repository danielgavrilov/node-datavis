/*
 * action types
 */

export const SELECT_PICTURE = "SELECT_PICTURE"

/*
 * action creators
 */

export function selectPicture(pictureId) {
  return {
    type: SELECT_PICTURE,
    pictureId
  }
}

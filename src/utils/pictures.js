export function currentPicture(state) {
  const pictureId = state.getIn(["editor", "pictureId"]);
  return state.getIn(["pictures", pictureId]);
}


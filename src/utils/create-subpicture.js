import { stateFromJS } from "./state";

export default function({ pictureId }) {
  return stateFromJS({
    picture: pictureId,
    scope: null,
    override: {}
  });
}

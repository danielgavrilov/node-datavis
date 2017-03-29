import { Map } from "immutable";

export default function(state=Map(), action) {
  switch (action.type) {
    case "ADD":
      const count = state.get("count") || 0;
      return state.set("count", count + 1);
    default:
      return state;
  }
}

import { isString } from "lodash";
import { fromJS, Iterable } from "immutable";

export function stateToJS(state) {
  return state.toJS();
}

export function stateFromJS(object) {
  return fromJS(object, function(key, value) {
    if (isString(key) && key.indexOf("__") === 0) {
      return value.toJS();
    } else {
      return Iterable.isKeyed(value) ? value.toMap() : value.toList();
    }
  });
}

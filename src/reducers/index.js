import {
  SELECT_PICTURE,
  SELECT_SUBPICTURE,
  RENAME_VARIABLE,
  CHANGE_VARIABLE,
  RENAME_PARAMETER,
  CHANGE_PARAMETER,
  CHANGE_SCOPE
} from "../actions";

import evaluate from "../engine/evaluate";
import { buildPictureSpec } from "../engine/draw";
import { currentPictureId, currentSubpictureId } from "../utils/pictures";

function reducePath(state, path, reducer, ...args) {
  return state.setIn(
    path,
    reducer(state.getIn(path), ...args)
  );
}

const renameKey = (map, oldPath, newPath) => {
  const oldValue = map.getIn(oldPath);
  return map.setIn(newPath, oldValue)
            .deleteIn(oldPath);
};

const renameInList = (list, oldValue, newValue) => {
  return list.map((value) => {
    return (value === oldValue) ? newValue : value;
  });
}

const renameVariable = (picture, { oldName, newName }) => {
  return picture.withMutations((picture) => {

    // update name in graph
    const __ref = picture.getIn(["variables", oldName, "__ref"]);
    picture.setIn(["graph", __ref, "name"], newName);

    // rename key in "picture.variables"
    renameKey(picture, ["variables", oldName], ["variables", newName]);
    console.log(picture.toJS());

    // rename in categories array
    picture.getIn(["variableCategories"]).forEach((variableNames, categoryName) => {
      picture.setIn(
        ["variableCategories", categoryName],
        renameInList(variableNames, oldName, newName)
      )
    });
  });
}

const renameParameter = (subpicture, { oldName, newName }) => {
  console.log({ oldName, newName });
  return subpicture;
}

const changeParameter = (state, pictureId, subpictureId, name, value) => {
  return state.setIn([
    "pictures",
    pictureId,
    "subpictures",
    subpictureId,
    "override",
    name
  ], value);
}

const changeScope = (state, pictureId, subpictureId, newScope) => {
  const scope = newScope !== "" ? newScope : null;
  return state.setIn([
    "pictures",
    pictureId,
    "subpictures",
    subpictureId,
    "scope"
  ], scope);
}

function evalPicture(state, pictureId) {

  const pictures = state.get("pictures");
  let errors = [];

  try {
    const results = evaluate(pictures.get(pictureId));
    state = state.setIn(["pictures", pictureId, "__results"], results);
    const preview = buildPictureSpec(pictures, pictureId, results.variables);
    state = state.setIn(["pictures", pictureId, "__preview"], preview);
  } catch(error) {
    errors.push(error);
    state = state.setIn(["pictures", pictureId, "__errors"], errors);
  }

  return state;
};

export default function(state=Map(), action) {
  const pictureId = currentPictureId(state);
  const subpictureId = currentSubpictureId(state);
  let newState;
  switch (action.type) {

    case SELECT_PICTURE:
      newState = state.setIn(["editor", "pictureId"], action.pictureId)
                      .setIn(["editor", "computationPane", "selected", "type"], null)
                      .setIn(["editor", "computationPane", "selected", "item"], null)
                      .setIn(["editor", "inspectorPane", "subpictureId"], null)
      return evalPicture(newState, action.pictureId);

    case SELECT_SUBPICTURE:
      return state.setIn(["editor", "inspectorPane", "subpictureId"], action.subpictureId);

    case RENAME_VARIABLE:
      if (action.newName !== action.oldName) {
        newState = reducePath(
          state,
          ["pictures", pictureId],
          renameVariable,
          action
        );
        newState = evalPicture(newState, pictureId);
        return newState;
      } else {
        return state;
      }

    case RENAME_PARAMETER:
      newState = reducePath(
        state,
        ["pictures", pictureId, "subpictures", subpictureId],
        renameParameter,
        action
      );
      newState = evalPicture(newState, pictureId);
      return newState;

    case CHANGE_PARAMETER:
      newState = changeParameter(state, pictureId, subpictureId, action.name, action.value);
      newState = evalPicture(newState, pictureId);
      return newState;

    case CHANGE_SCOPE:
      newState = changeScope(state, pictureId, subpictureId, action.newScope);
      newState = evalPicture(newState, pictureId);
      return newState;

    default:
      return state;
  }
}

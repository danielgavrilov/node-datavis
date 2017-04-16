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

const selectPicture = (editor, { pictureId }) => {
  return editor.setIn(["pictureId"], pictureId)
               .setIn(["computationPane", "selected", "type"], null)
               .setIn(["computationPane", "selected", "item"], null)
               .setIn(["inspectorPane", "subpictureId"], null);
}

const selectSubpicture = (editor, { subpictureId }) => {
  return editor.setIn(["inspectorPane", "subpictureId"], subpictureId);
}

const renameVariable = (picture, { oldName, newName }) => {
  return picture.withMutations((picture) => {

    // update name in graph
    const __ref = picture.getIn(["variables", oldName, "__ref"]);
    picture.setIn(["graph", __ref, "name"], newName);

    // rename key in "picture.variables"
    renameKey(picture, ["variables", oldName], ["variables", newName]);

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
  return renameKey(subpicture, ["override", oldName], ["override", newName]);
}

const changeParameter = (subpicture, { name, value }) => {
  return subpicture.setIn(["override", name], value);
}

const changeScope = (subpicture, { newScope }) => {
  const scope = newScope !== "" ? newScope : null;
  return subpicture.setIn(["scope"], scope);
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
  } finally {
    state = state.setIn(["pictures", pictureId, "__errors"], errors);
  }

  return state;
};

export default function(state=Map(), action) {
  const pictureId = currentPictureId(state);
  const subpictureId = currentSubpictureId(state);
  switch (action.type) {

    case SELECT_PICTURE:
      state = reducePath(
        state,
        ["editor"],
        selectPicture,
        action
      );
      return evalPicture(state, action.pictureId);

    case SELECT_SUBPICTURE:
      return reducePath(
        state,
        ["editor"],
        selectSubpicture,
        action
      );

    case RENAME_VARIABLE:
      if (action.newName === action.oldName) {
        return state;
      }
      state = reducePath(
        state,
        ["pictures", pictureId],
        renameVariable,
        action
      );
      state = evalPicture(state, pictureId);
      return state;

    case RENAME_PARAMETER:
      if (action.newName === action.oldName) {
        return state;
      }
      state = reducePath(
        state,
        ["pictures", pictureId, "subpictures", subpictureId],
        renameParameter,
        action
      );
      state = evalPicture(state, pictureId);
      return state;

    case CHANGE_PARAMETER:
      state = reducePath(
        state,
        ["pictures", pictureId, "subpictures", subpictureId],
        changeParameter,
        action
      )
      state = evalPicture(state, pictureId);
      return state;

    case CHANGE_SCOPE:
      state = reducePath(
        state,
        ["pictures", pictureId, "subpictures", subpictureId],
        changeScope,
        action
      )
      state = evalPicture(state, pictureId);
      return state;

    default:
      return state;
  }
}

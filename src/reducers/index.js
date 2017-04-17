import {

  SELECT_PICTURE,
  ADD_PICTURE,
  REMOVE_PICTURE,
  RENAME_PICTURE,

  SELECT_SUBPICTURE,
  ADD_SUBPICTURE,
  REMOVE_SUBPICTURE,
  REODER_SUBPICTURE,

  ADD_VARIABLE,
  REMOVE_VARIABLE,
  RENAME_VARIABLE,
  CHANGE_VARIABLE,

  ADD_PARAMETER,
  REMOVE_PARAMETER,
  RENAME_PARAMETER,
  CHANGE_PARAMETER,

  CHANGE_SCOPE

} from "../actions";

import evaluate from "../engine/evaluate";
import createPicture from "../utils/create-picture";
import { buildPictureSpec } from "../engine/draw";
import { currentPictureId, currentSubpictureId } from "../utils/pictures";
import { generateId } from "../utils/identifiers";

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

const selectPicture = (state, { pictureId }) => {
  return state.setIn(["editor", "pictureId"], pictureId)
              .setIn(["editor", "computationPane", "selected", "type"], null)
              .setIn(["editor", "computationPane", "selected", "item"], null)
              .setIn(["editor", "inspectorPane", "subpictureId"], null);
}

const addPicture = (state) => {
  const name = "picture";
  const id = generateId();
  const newPicture = createPicture({ name });
  state = state.setIn(["pictures", id], newPicture)
  state = reducePath(
    state,
    ["editor", "picturesPane", "picturesOrder"],
    (picturesOrder) => picturesOrder.push(id)
  );
  state = selectPicture(state, { pictureId: id });
  return state;
}

const selectSubpicture = (state, { subpictureId }) => {
  return state.setIn(["editor", "inspectorPane", "subpictureId"], subpictureId);
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

    case ADD_PICTURE:
      state = addPicture(state);
      const newPictureId = currentPictureId(state);
      return evalPicture(state, newPictureId);

    case SELECT_PICTURE:
      state = selectPicture(state, action);
      return evalPicture(state, action.pictureId);

    case SELECT_SUBPICTURE:
      return selectSubpicture(state, action);

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

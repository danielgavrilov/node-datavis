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
import createSubpicture from "../utils/create-subpicture";
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

const removeInList = (list, value) => {
  return list.filter((x) => x !== value);
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

const removePicture = (state, { pictureId }) => {
  state = reducePath(
    state,
    ["editor", "picturesPane", "picturesOrder"],
    (picturesOrder) => removeInList(picturesOrder, pictureId)
  );
  state = state.deleteIn(["pictures", pictureId]);
  const current = currentPictureId(state);
  // if the selected picture is deleted, then select a random one
  if (pictureId === current) {
    const pictureId = state.getIn(["editor", "picturesPane", "picturesOrder"]).get(0);
    if (pictureId) {
      state = selectPicture(state, { pictureId });
    } else {
      state = addPicture(state);
    }
  }
  return state;
}

const selectSubpicture = (state, { subpictureId }) => {
  return state.setIn(["editor", "inspectorPane", "subpictureId"], subpictureId);
}

const addSubpicture = (picture, { pictureId }) => {
  const id = generateId();
  picture = picture.setIn(["subpictures", id], createSubpicture({ pictureId }))
  picture = reducePath(
    picture,
    ["subpicturesOrder"],
    (order) => order.push(id)
  );
  return picture;
};

const removeSubpicture = (picture, { subpictureId }) => {
  picture = picture.deleteIn(["subpictures", subpictureId]);
  picture = reducePath(
    picture,
    ["subpicturesOrder"],
    (order) => removeInList(order, subpictureId)
  );
  return picture;
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

const changeVariable = (picture, { name, value, valueType }) => {
  if (valueType === "EXPRESSION") {
    const variable = picture.getIn(["variables", name]);
    const __ref = variable.get("__ref");
    picture = picture.setIn(["graph", __ref, "expression"], value);
  }
  return picture;
};

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
      return evalPicture(state, currentPictureId(state));

    case REMOVE_PICTURE:
      state = removePicture(state, action);
      return evalPicture(state, currentPictureId(state));

    case SELECT_PICTURE:
      state = selectPicture(state, action);
      return evalPicture(state, action.pictureId);

    case ADD_SUBPICTURE:
      state = reducePath(
        state,
        ["pictures", pictureId],
        addSubpicture,
        action
      );
      const newSubpictureId = state.getIn(["pictures", pictureId, "subpicturesOrder"]).last();
      state = selectSubpicture(state, { subpictureId: newSubpictureId });
      return evalPicture(state, pictureId);

    case REMOVE_SUBPICTURE:
      state = reducePath(
        state,
        ["pictures", pictureId],
        removeSubpicture,
        action
      );
      if (subpictureId === action.subpictureId) {
        state = selectSubpicture(state, { subpictureId: null });
      }
      return evalPicture(state, pictureId);

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
      return evalPicture(state, pictureId);

    case CHANGE_VARIABLE:
      state = reducePath(
        state,
        ["pictures", pictureId],
        changeVariable,
        action
      )
      return evalPicture(state, pictureId);

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
      return evalPicture(state, pictureId);

    case CHANGE_PARAMETER:
      state = reducePath(
        state,
        ["pictures", pictureId, "subpictures", subpictureId],
        changeParameter,
        action
      )
      return evalPicture(state, pictureId);

    case CHANGE_SCOPE:
      state = reducePath(
        state,
        ["pictures", pictureId, "subpictures", subpictureId],
        changeScope,
        action
      )
      return evalPicture(state, pictureId);

    default:
      return state;
  }
}

function makeAction(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((argName, index) => {
      if (argName === "type") throw new Error("action creator was asked to override type");
      action[argName] = args[index];
    })
    return action
  }
}

/*
 * action types
 */

export const SELECT_PICTURE = "SELECT_PICTURE";
export const ADD_PICTURE = "ADD_PICTURE";
export const REMOVE_PICTURE = "REMOVE_PICTURE";
export const RENAME_PICTURE = "RENAME_PICTURE";

export const SELECT_SUBPICTURE = "SELECT_SUBPICTURE";
export const ADD_SUBPICTURE = "ADD_SUBPICTURE";
export const REMOVE_SUBPICTURE = "REMOVE_SUBPICTURE";
export const REORDER_SUBPICTURE = "REORDER_SUBPICTURE";

export const ADD_VARIABLE = "ADD_VARIABLE";
export const REMOVE_VARIABLE = "REMOVE_VARIABLE";
export const RENAME_VARIABLE = "RENAME_VARIABLE";
export const CHANGE_VARIABLE = "CHANGE_VARIABLE";

export const ADD_PARAMETER = "ADD_PARAMETER";
export const REMOVE_PARAMETER = "REMOVE_PARAMETER";
export const RENAME_PARAMETER = "RENAME_PARAMETER";
export const CHANGE_PARAMETER = "CHANGE_PARAMETER";

export const CHANGE_SCOPE = "CHANGE_SCOPE";

/*
 * action creators
 */

export const selectPicture = makeAction(
  SELECT_PICTURE,
  "pictureId"
);

export const addPicture = makeAction(
  ADD_PICTURE
);

export const removePicture = makeAction(
  REMOVE_PICTURE,
  "pictureId"
);

export const renamePicture = makeAction(
  RENAME_PICTURE,
  "pictureId", "name"
);


export const selectSubpicture = makeAction(
  SELECT_SUBPICTURE,
  "subpictureId"
);

export const addSubpicture = makeAction(
  ADD_SUBPICTURE,
  "pictureId"
);

export const removeSubpicture = makeAction(
  REMOVE_SUBPICTURE,
  "subpictureId"
);

export const reorderSubpicture = makeAction(
  REORDER_SUBPICTURE,
  "subictureId", "toIndex"
);


export const addVariable = makeAction(
  ADD_VARIABLE,
  "name", "value", "valueType"
);

export const removeVariable = makeAction(
  REMOVE_VARIABLE,
  "name"
);

export const renameVariable = makeAction(
  RENAME_VARIABLE,
  "oldName", "newName"
);

export const changeVariable = makeAction(
  CHANGE_VARIABLE,
  "name", "value", "valueType"
);


export const addParameter = makeAction(
  ADD_PARAMETER,
  "name", "value"
);

export const removeParameter = makeAction(
  REMOVE_PARAMETER,
  "name"
);

export const renameParameter = makeAction(
  RENAME_PARAMETER,
  "oldName", "newName"
);

export const changeParameter = makeAction(
  CHANGE_PARAMETER,
  "name", "value"
);


export const changeScope = makeAction(
  CHANGE_SCOPE,
  "newScope"
);

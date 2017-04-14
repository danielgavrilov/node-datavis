/*
 * action types
 */

export const SELECT_PICTURE = "SELECT_PICTURE";
export const SELECT_SUBPICTURE = "SELECT_SUBPICTURE";

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

export function selectPicture(pictureId) {
  return {
    type: SELECT_PICTURE,
    pictureId
  }
}

export function selectSubpicture(subpictureId) {
  return {
    type: SELECT_SUBPICTURE,
    subpictureId
  }
}

export function renameVariable(oldName, newName) {
  return {
    type: RENAME_VARIABLE,
    oldName,
    newName
  }
}

export function changeVariable(name, value, valueType) {
  return {
    type: CHANGE_VARIABLE,
    name,
    value,
    valueType
  }
}

export function renameParameter(oldName, newName) {
  return {
    type: RENAME_PARAMETER,
    oldName,
    newName
  }
}

export function changeParameter(name, value) {
  return {
    type: CHANGE_PARAMETER,
    name,
    value
  }
}

export function changeScope(newScope) {
  return {
    type: CHANGE_SCOPE,
    newScope
  }
}

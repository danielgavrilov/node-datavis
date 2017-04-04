import { combineReducers } from 'redux-immutable';

import editor from "./editor";
import pictures from "./pictures";

export default combineReducers({
  editor,
  pictures
});

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from "./reducers";
import App from './views/App';
import exampleState from "./store-example";

import './css/normalize.css';
import './css/general.css';
import './css/layout.css';

// TODO only temporray, remove later
//
import evaluate from "./engine/evaluate";
import { buildPictureSpec } from "./engine/draw";

function evalPicture(state, pictureName) {
  const pictures = state.get("pictures");
  const results = evaluate(pictures.get(pictureName));
  const preview = buildPictureSpec(pictures, pictureName, results.variables);
  return state
    .setIn(["pictures", pictureName, "__results"], results)
    .setIn(["pictures", pictureName, "__preview"], preview);
};

let state = exampleState;
state = evalPicture(state, "examplehashhash");
state = evalPicture(state, "examplehashhash2");


// END OF remove later

const store = createStore(rootReducer, state);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

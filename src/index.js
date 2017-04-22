import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from "./reducers";
import App from './views/App';
import exampleState from "./store-example";

import * as d3 from "d3";
import _ from "lodash";

window.d3 = d3;
window._ = _;

import './css/normalize.css';
import './css/general.css';
import './css/layout.css';

// TODO only temporray, remove later

import evaluate from "./engine/evaluate";
import { buildPictureSpec } from "./engine/draw";

function evalAllPictures(state) {
  const pictures = state.get("pictures");
  pictures.keySeq().forEach((pictureName) => {
    const results = evaluate(pictures.get(pictureName));
    const preview = buildPictureSpec(pictures, pictureName, results.variables);
    state = state
      .setIn(["pictures", pictureName, "__results"], results)
      .setIn(["pictures", pictureName, "__preview"], preview);
  });
  return state;
};

let state = exampleState;
state = evalAllPictures(state);

// END OF remove later


const store = createStore(rootReducer, state);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

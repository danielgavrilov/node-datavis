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
import evaluate from "./engine/evaluate";
const results = evaluate(exampleState.getIn(["pictures", "example"]));
const state = exampleState.setIn(["pictures", "example", "__results"], results);

const store = createStore(rootReducer, state);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

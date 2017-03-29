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

const store = createStore(rootReducer, exampleState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';

import App from './views/App';

import './css/normalize.css';
import './css/general.css';
import './css/layout.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

import evaluate from "./engine/evaluate";
import { functions, variables, graph } from "./engine/example";

import { parse } from "./engine/expression";

// console.log(evaluate({ functions, variables, graph }));
console.log(parse("width + height").fn(2, 5));

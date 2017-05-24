import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import Routes from './routes';

import sudokuApp from './redux/reducers'

import './index.css';

let store = createStore(sudokuApp);

ReactDOM.render(
  <Routes store={store}/>,
  document.getElementById('root')
);

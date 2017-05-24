import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import Routes from './routes';

import sudokuApp from './redux/reducers'

import './index.css';

let store = createStore(sudokuApp, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Routes store={store}/>,
  document.getElementById('root')
);

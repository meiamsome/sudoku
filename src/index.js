import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';

import Routes from './routes';

import sudokuApp from './redux/reducers'

import './index.css';

let store = createStore(sudokuApp,
  compose(applyMiddleware(thunkMiddleware),
    persistState(['account'])
  )
);

ReactDOM.render(
  <Routes store={store}/>,
  document.getElementById('root')
);

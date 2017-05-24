import { combineReducers } from 'redux';
import {
  LOGIN,
  LOGOUT,
} from './actions.js';

function sudokuState(state = [...Array(9).keys()].map(_ => [...Array(9).keys()].map(i => i)), action) {
  switch (action.type) {
    default:
      return state;
  }
}

function loginReducer(state = {
  username: null,
}, action) {
  switch(action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        username: action.username,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        username: null,
      });
    default:
      return state;
  }
}

function settingsReducer(state = {

}, action) {
  switch(action.type) {
    default:
      return state;
  }
}

const sudokuApp = combineReducers({
  sudoku: sudokuState,
  account: combineReducers({
    login: loginReducer,
    settings: settingsReducer,
  }),
});

export default sudokuApp;

import { combineReducers } from 'redux';
import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './actions.js';

function sudokuState(state = [...Array(9).keys()].map(_ => [...Array(9).keys()].map(i => i)), action) {
  switch (action.type) {
    default:
      return state;
  }
}

function loginReducer(state = {
  username: null,
  attempting_login: false,
}, action) {
  console.log(action);
  switch(action.type) {
    case LOGIN_ATTEMPT:
      return Object.assign({}, state, {
        attempting_login: true,
      });
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        attempting_login: false,
        username: action.username,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        attempting_login: false,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        username: null,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        attempting_login: false,
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

import { combineReducers } from 'redux';
import {
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './actions.js';

function sudokuState(state = [...Array(9).keys()].map(_ => [...Array(9).keys()].map(i => i)), action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const LOGIN_STATE = {
  LOGGED_OUT: 0,
  LOGGING_IN_PROGRESS: 1,
  LOGGING_IN_ERROR: 2,
  LOGGED_IN: 3,
  REGISTERING_PROGRESS: 4,
  REGISTERING_ERROR: 5,
}

function loginReducer(state = {
  username: null,
  status: LOGIN_STATE.LOGGED_OUT,
  error: null,
  destination: '/',
}, action) {
  console.log(action);
  switch(action.type) {
    case LOGIN_ATTEMPT:
      return Object.assign({}, state, {
        status: LOGIN_STATE.LOGGING_IN
      });
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        status: LOGIN_STATE.LOGGED_IN,
        username: action.username,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        status: LOGIN_STATE.LOGGING_IN_ERROR,
        error: action.reason,
      });
    case LOGOUT:
      return Object.assign({}, state, {
        status: LOGIN_STATE.LOGGED_OUT,
        username: null,
      });
    case REGISTER_ATTEMPT:
      return Object.assign({}, state, {
        status: LOGIN_STATE.REGISTERING_PROGRESS,
        username: null,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        status: LOGIN_STATE.REGISTERING_ERROR,
        error: action.reason,
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

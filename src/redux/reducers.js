import { combineReducers } from 'redux';
import {
  LOAD_SUDOKU,
  UPDATE_SUDOKU,
  SET_CELL,
  SET_DAILY,
  LOGIN_ATTEMPT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_ATTEMPT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './actions.js';

export const SUDOKU_STATE = {
  LOADING: 0,
  LOADED: 1,
  COMPLETE: 2,
}

function sudokuState(state = {

}, action) {
  switch (action.type) {
    case LOAD_SUDOKU:
      if(state[action.target] !== undefined) {
        return state;
      }
      var update = {};
      update[action.target] = {
        status: SUDOKU_STATE.LOADING,
      }
      return Object.assign({}, state, update);
    case UPDATE_SUDOKU:
      var update = {};
      update[action.target] = {
        status: SUDOKU_STATE.LOADED,
        initial: action.data.initial_board,
        grid: action.data.progress,
        date: new Date(action.data.date),
      }
      return Object.assign({}, state, update);
    case SET_CELL:
      var update = {};
      var old_grid = state[action.target].grid;
      var index = action.y * 9 + action.x;
      update[action.target] = Object.assign({}, state[action.target], {
        grid: old_grid.substr(0, index) + action.value + old_grid.substr(index + 1),
      });
      return Object.assign({}, state, update);
    case SET_DAILY:
      return Object.assign({}, state, {
        daily: state[action.target],
      });
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

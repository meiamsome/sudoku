import { combineReducers } from 'redux';
import {

} from './actions.js';

function sudokuState(state = [...Array(9).keys()].map(_ => [...Array(9).keys()].map(i => i)), action) {
  switch (action.type) {
    default:
      return state;
  }
}

const sudokuApp = combineReducers({
  sudoku: sudokuState
});

export default sudokuApp;

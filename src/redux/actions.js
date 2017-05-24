
export const CHANGE_SUDOKU = 'CHANGE_SUDOKU';

export function changeSudoku(target) {
  return {
    type: CHANGE_SUDOKU,
    target: target,
  }
}

// Account actions

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

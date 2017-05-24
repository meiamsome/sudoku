
export const CHANGE_SUDOKU = 'CHANGE_SUDOKU';

export function changeSudoku(target) {
  return {
    type: CHANGE_SUDOKU,
    target: target,
  }
}

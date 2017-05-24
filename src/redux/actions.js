
export const CHANGE_SUDOKU = 'CHANGE_SUDOKU';

export function changeSudoku(target) {
  return {
    type: CHANGE_SUDOKU,
    target: target,
  }
}

// Account actions

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export function attemptLogin(username, password) {
  return dispatch => {
    dispatch({
      type: LOGIN_ATTEMPT,
      username: username,
    });
    // TODO: Request login
    return fetch("/").then(response => dispatch({
      type: LOGIN_SUCCESS,
      username: username,
    }));
  };
}

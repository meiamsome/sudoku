import { browserHistory } from 'react-router';

export const LOAD_SUDOKU = 'LOAD_SUDOKU';
export const UPDATE_SUDOKU = 'UPDATE_SUDOKU';
export const SET_DAILY = 'SET_DAILY';

export function load_sudoku(target) {
  console.log(target);
  if(target === "daily") return (dispatch) => {
    fetch('/api/sudoku/daily/')
      .then(resp => resp.json()).then(data => {
        if(data.status === "ok") {
          dispatch(load_sudoku(data.sudoku));
          dispatch({
            type: SET_DAILY,
            target: data.sudoku,
          });
        }
        //TODO: Handle error situation.
      });
  }
  return (dispatch) => {
    dispatch({
      type: LOAD_SUDOKU,
      target: target,
    });
    fetch('/api/sudoku/' + target + '/')
      .then(resp => resp.json()).then(data => {
        if(data.status === "ok") {
          dispatch({
            type: UPDATE_SUDOKU,
            data: data,
          });
        }
        //TODO: Handle errors
      });
  };
}

// Account actions

export const LOGIN_REQUIRED = 'LOGIN_REQUIRED';

export function login_required(attempted_page) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUIRED,
      page: attempted_page,
    });
    browserHistory.push('/login/');
  }
}

export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export function attemptLogin(username, password) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_ATTEMPT,
      username: username,
    });
    return fetch("/api/account/login/", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then(response => response.json()).then(data => {
      if(data.status === "ok") {
        dispatch({
          type: LOGIN_SUCCESS,
          username: username,
          token: data.token,
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          reason: data.reason,
        });
      }
    }).catch(function(reason) {
      dispatch({
        type: LOGIN_FAILURE,
        reason: "An error has occured: " + reason,
      })
    });
  };
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export const REGISTER = 'register';
export const REGISTER_FAILURE = 'register_failure';
export const REGISTER_SUCCESS = 'register_success';

export function register(username, email, password) {
  return (dispatch) => {
    dispatch({
      type: REGISTER,
      username: username,
    });
    return fetch("/api/account/register/", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    }).then(response => response.json()).then(data => {
      if(data.status === "ok") {
        dispatch({
          type: REGISTER_SUCCESS,
          username: username,
          token: data.token,
        });
      } else {
        dispatch({
          type: REGISTER_FAILURE,
          reason: data.reason,
        });
      }
    }).catch(function(reason) {
      dispatch({
        type: REGISTER_FAILURE,
        reason: "An error has occured: " + reason,
      })
    });;
  }
}

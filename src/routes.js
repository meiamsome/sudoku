import React, { PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux';

import Template from './components/page';
import Sudoku from './components/sudoku';
import { Login, Register } from './components/accounts';

import login_required from './redux/actions';

function requireLogin(store, nextState, replace) {
  console.log(nextState.location.pathname);
  if(store.account.login.username === null) {
    store.dispatch(login_required(nextState.location.pathname));
    replace('/login/');
  }
}

function requireNoLogin(store, nextState, replace) {
  console.log(store, nextState.location.pathname);
  if(store.account.login.username !== null) {
    replace('/');
  }
}


const Routes = ({store}) => (
  <Provider store={store}>
    <Router>
      <Template>
        <Route path="/sudoku/" component={Sudoku} />
        <Route
          path="/login/"
          component={Login} />
        <Route
          path="/register/"
          component={Register}/>
      </Template>
    </Router>
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.object.isRequired,
};


export default Routes;

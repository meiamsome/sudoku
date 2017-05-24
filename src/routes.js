import React, { PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux';

import Template from './components/page';
import Sudoku from './components/sudoku';
import Login from './components/accounts';

const Routes = ({store}) => (
  <Provider store={store}>
    <Router>
      <Template>
        <Route path="/sudoku/" component={Sudoku} />
        <Route path="/login/" component={Login} />
      </Template>
    </Router>
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.object.isRequired,
};


export default Routes;

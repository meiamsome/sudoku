import React, { PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux';

import Template from './components/page';
import Sudoku from './components/sudoku';

const Routes = ({store}) => (
  <Provider store={store}>
    <Router>
      <Template>
        <Route path="/">
          <Route path="/sudoku/" component={Sudoku} />
        </Route>
      </Template>
    </Router>
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.object.isRequired,
};


export default Routes;

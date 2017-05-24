import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Template from './components/page';
import Sudoku from './components/sudoku';

const Routes = (props) => (
  <Router {...props}>
    <Template>
      <Route path="/">
        <Route path="/sudoku/" component={Sudoku} />
      </Route>
    </Template>
  </Router>
);


export default Routes;

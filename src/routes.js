import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Sudoku from './components/sudoku';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/">
      <Route path="/sudoku/" component={Sudoku} />
    </Route>
  </Router>
);


export default Routes;

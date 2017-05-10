import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';


const Routes = (props) => (
  <Router {...props}>
    <Route path="/">
      <IndexRoute />
    </Route>
  </Router>
);


export default Routes;

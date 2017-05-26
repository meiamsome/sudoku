import React from 'react';
import { Col, Grid } from 'react-bootstrap';

import Navigation from './navbar';
import Sidebar from './sidebar';

export default class Template extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <Grid>
          <Col md={2} xsHidden smHidden>
            <Sidebar />
          </Col>
          <Col mdOffset={1} md={9}>
            {this.props.children}
          </Col>
        </Grid>
      </div>
    );
  }
};

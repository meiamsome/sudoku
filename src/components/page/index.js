import React from 'react';

import Navigation from './navbar';

export default class Template extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
};

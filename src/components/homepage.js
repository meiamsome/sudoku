import React from 'react';
import { connect } from 'react-redux';
import { Col, Grid } from 'react-bootstrap';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Sudoku</h1>
        <p>Welcome to the sudoku website.</p>
      </div>
    );
  }
};

Home = connect((state) => {
  return {

  }
})(Home);


export default Home;

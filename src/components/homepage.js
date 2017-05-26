import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    var now = new Date();
    var month = now.getUTCMonth() + 1;
    if(month < 10) month = "0" + month;
    var day = now.getUTCDate();
    if(day < 10) day = "0" + day;
    var today = now.getUTCFullYear() + "-" + month + "-" + day;
    return (
      <div>
        <h1>Sudoku</h1>
        <p>Welcome to the sudoku website.</p>
        <Link to={"/sudoku/" + today + "/"}>Today&rsquo;s Sudoku</Link>
      </div>
    );
  }
};

Home = connect((state) => {
  return {

  }
})(Home);


export default Home;

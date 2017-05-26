import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <h3>Play Sudoku!</h3>
        <ul>
          <li><Link to="/sudoku/daily/">Today&rsquo;s Sudoku</Link></li>
          <li><Link to="/sudoku/random/">Random Sudoku</Link></li>
        </ul>
      </div>
    );
  }
};

Sidebar = connect((state) => {
  return {

  }
})(Sidebar);


export default Sidebar;

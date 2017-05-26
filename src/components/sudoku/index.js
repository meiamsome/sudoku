import React from 'react';
import { connect } from 'react-redux';

import { load_sudoku } from '../../redux/actions';
import { SUDOKU_STATE } from '../../redux/reducers';

class Sudoku extends React.Component {
  constructor(...props) {
    super(...props);
    this.find_me();
  }

  componentWillMount() {
    this.find_me();
  }

  componentWillReceiveProps() {
    this.find_me();
  }

  find_me() {
    console.log(this.props);
    this.me = this.props.sudoku[this.props.match.params.id];
    if(this.me === undefined) {
      this.props.load_sudoku(this.props.match.params.id);
    }
  }

  cell(x, y) {
    if(this.me.initial[x][y] === 0) {
      return (
        <td key={y}><input type="text" value={this.me.grid[x][y]} /></td>
      )
    } else {
      return (
        <td key={y}><input type="text" value={this.me.initial[x][y]} /></td>
      )
    }
  }

  render() {
    this.find_me();
    if(this.me === undefined || this.me.status === SUDOKU_STATE.LOADING) {
      return (
        <div>
          Loading, please wait.
        </div>
      )
    }

    return (
      <div>
        <h1>Easy Sudoku #1</h1>
        <table className="sudoku">
          <tbody>
            {
              [...Array(9).keys()].map((_, rindex) => {
                return (
                  <tr key={rindex}>
                    {
                      [...Array(9).keys()].map((_, cindex) => this.cell(cindex, rindex))
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
};

Sudoku = connect((state) => {
  return {
    sudoku: state.sudoku,
  }
}, (dispatch) => {
  return {
    load_sudoku: (sudoku_id) => {
      dispatch(load_sudoku(sudoku_id));
    }
  }
})(Sudoku);


export default Sudoku;

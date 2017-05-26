import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { load_sudoku, set_cell } from '../../redux/actions';
import { SUDOKU_STATE } from '../../redux/reducers';

function dateToURL(date) {
  return "/sudoku/" + date.toISOString().split('T')[0] + "/";
}

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

  update_cell(x, y, ev) {
    if(this.me.status === SUDOKU_STATE.LOADED && /^[1-9]?$/.test(ev.target.value)) {
      this.props.set_cell(this.props.match.params.id, x, y,
        ev.target.value === "" ? "0" : ev.target.value);
    }
  }

  cell(x, y) {
    if(this.me.initial[y * 9 + x] === "0") {
      var value = this.me.grid[y * 9 + x];
      if(value == "0") {
        value = "";
      }
      return (
        <td key={x}><input type="text"
          value={value} onChange={this.update_cell.bind(this, x, y)}/></td>
      )
    } else {
      return (
        <td key={x} className="initial">{this.me.initial[y * 9 + x]}</td>
      )
    }
  }

  format_date(date) {
    var month = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December",
    ][date.getUTCMonth()];
    return date.getUTCDate() + " " + month + " " + date.getUTCFullYear();
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
        <h1>Sudoku For {this.format_date(this.me.date)}</h1>
        <Link to={dateToURL(new Date(this.me.date.valueOf() - 86400000))}>previous</Link>
        <Link to={dateToURL(new Date(this.me.date.valueOf() + 86400000))}>next</Link>
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
        {
          (this.me.first_solver !== null) ?
            (
              <p>First solved by {this.me.first_solver}</p>
            )
          : ""
        }
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
    },
    set_cell: (sudoku_id, x, y, value) => dispatch(set_cell(sudoku_id, x, y, value)),
  }
})(Sudoku);


export default Sudoku;

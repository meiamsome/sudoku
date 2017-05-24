import React from 'react';
import { connect } from 'react-redux';

class Sudoku extends React.Component {
  constructor({grid, ...props}) {
    super(...props);
    this.grid = grid;
  }

  render() {
    return (
      <table>
        <tbody>
          {
            this.grid.map((row, rindex) => {
              return (
                <tr key={rindex}>
                  {
                    row.map((cell, cindex) => {
                      return (
                        <td key={cindex}>{cell}</td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    );
  }
};

Sudoku = connect((state) => {
  return {
    grid: state.sudoku,
  }
})(Sudoku);


export default Sudoku;

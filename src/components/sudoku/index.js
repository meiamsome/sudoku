import React from 'react';

export default class Sudoku extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      grid: [...Array(9).keys()].map(_ => [...Array(9).keys()].map(i => i)),
    };
  }

  render() {
    return (
      <table>
        <tbody>
          {
            this.state.grid.map((row, rindex) => {
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

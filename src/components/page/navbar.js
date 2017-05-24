import React from 'react';
import { connect } from 'react-redux';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Navigation extends React.Component {
  render() {
    console.log("Render", this.props.account);
    let rhs = (
      <NavItem href="/login/">Login</NavItem>
    );
    if(this.props.account.login.username !== null) {
      rhs = (
        <NavDropdown eventKey={3} title={this.props.account.login.username} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem href="/logout/">Log Out</MenuItem>
        </NavDropdown>
      )
    }
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Sudoku</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          {rhs}
        </Nav>
      </Navbar>
    )
  }
}

Navigation = connect((state) => {
  return {
    account: state.account,
  }
})(Navigation);

export default Navigation;

import React from 'react';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import { logout } from '../../redux/actions';
import { LOGIN_STATE } from '../../redux/reducers';

class Navigation extends React.Component {
  render() {
    let rhs = (
      <Nav pullRight>
        <NavItem><Link to="/login/">Login</Link></NavItem>
        <NavItem><Link to="/register/">Register</Link></NavItem>
      </Nav>
    );
    if(this.props.account.login.status === LOGIN_STATE.LOGGED_IN) {
      rhs = (
        <Nav pullRight>
          <NavDropdown eventKey={3} title={this.props.account.login.username} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem onClick={this.props.logout}>Log Out</MenuItem>
          </NavDropdown>
        </Nav>
      )
    }
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Sudoku</a>
          </Navbar.Brand>
        </Navbar.Header>
        {rhs}
      </Navbar>
    )
  }
}

Navigation = connect((state) => {
  return {
    account: state.account,
  }
}, (dispatch) => {
  return {
    logout: () => {
      dispatch(logout())
    }
  }
})(Navigation);

export default Navigation;

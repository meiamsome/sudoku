import React from 'react';

import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal,
} from 'react-bootstrap';

import { connect } from 'react-redux';

import { attemptLogin, logout, register } from '../../redux/actions';

import { LOGIN_STATE } from '../../redux/reducers';

class Login extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      username: "",
      password: "",
    }
  }

  handleChange(name, ev) {
    if(this.props.account_status === LOGIN_STATE.LOGGED_OUT)
      this.setState({[name]: ev.target.value});
  }

  login(ev) {
    this.props.login(this.state.username, this.state.password);
    ev.preventDefault();
  }

  render() {
    if(this.props.account_status === LOGIN_STATE.LOGGED_IN) return (
      <h3>You are now logged in.</h3>
    )
    return (
      <Form horizontal onSubmit={this.login.bind(this)}>
        <FormGroup>
          <Col sm={2}>
            <ControlLabel>Username</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              placeholder="Username"
              value={this.state.username}
              disabled={this.props.account_status !== LOGIN_STATE.LOGGED_OUT}
              onChange={this.handleChange.bind(this, "username")}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={2}>
            <ControlLabel>Password</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              placeholder="password"
              value={this.state.password}
              disabled={this.props.account_status !== LOGIN_STATE.LOGGED_OUT}
              onChange={this.handleChange.bind(this, "password")}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Log in
            </Button>
          </Col>
        </FormGroup>
        <Modal show={this.props.account_status === LOGIN_STATE.LOGGING_IN_ERROR} onHide={this.props.logout}>
          <Modal.Header closeButton>
            <Modal.Title>Failed to login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.error}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.logout}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
};

Login = connect((state) => {
  return {
    account_status: state.account.login.status,
    error: state.account.login.error,
  };
}, (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(attemptLogin(username, password));
    },
    logout: () => {
      dispatch(logout());
    }
  }
})(Login);

class Register extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      username: "",
      email: "",
      password: "",
    }
  }

  handleChange(name, ev) {
    if(this.props.account_status === LOGIN_STATE.LOGGED_OUT)
      this.setState({[name]: ev.target.value});
  }

  register(ev) {
    ev.preventDefault();
    this.props.register(
      this.state.username,
      this.state.email,
      this.state.password);
  }

  render() {
    if(this.props.account_status === LOGIN_STATE.LOGGED_IN) return (
      <h3>You are now registered.</h3>
    );
    return (
      <Form horizontal onSubmit={this.register.bind(this)}>
        <FormGroup>
          <Col sm={2}>
            <ControlLabel>Username</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              placeholder="Username"
              value={this.state.username}
              disabled={this.props.account_status !== LOGIN_STATE.LOGGED_OUT}
              onChange={this.handleChange.bind(this, "username")}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={2}>
            <ControlLabel>Email</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl
              type="email"
              placeholder="email"
              value={this.state.email}
              disabled={this.props.account_status !== LOGIN_STATE.LOGGED_OUT}
              onChange={this.handleChange.bind(this, "email")}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={2}>
            <ControlLabel>Password</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl
              type="password"
              placeholder="password"
              value={this.state.password}
              disabled={this.props.account_status !== LOGIN_STATE.LOGGED_OUT}
              onChange={this.handleChange.bind(this, "password")}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Register
            </Button>
          </Col>
        </FormGroup>
        <Modal show={this.props.account_status === LOGIN_STATE.REGISTERING_ERROR} onHide={this.props.logout}>
          <Modal.Header closeButton>
            <Modal.Title>Failed to login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.error}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.logout}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
};

Register = connect((state) => {
  return {
    account_status: state.account.login.status,
    error: state.account.login.error,
  };
}, (dispatch) => {
  return {
    register: (username, email, password) => {
      dispatch(register(
        username,
        email,
        password));
    },
    logout: () => {
      dispatch(logout());
    }
  }
})(Register);

export { Login, Register };

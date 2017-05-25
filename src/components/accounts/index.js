import React from 'react';

import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

import { connect } from 'react-redux';

import { attemptLogin, register } from '../../redux/actions';

class Login extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      username: "",
      password: "",
    }
  }

  handleChange(name, ev) {
    if(!this.props.attempting_login)
      this.setState({[name]: ev.target.value});
  }

  login(ev) {
    this.props.login(this.state.username, this.state.password);
    ev.preventDefault();
  }

  render() {
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
              disabled={this.props.attempting_login}
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
              disabled={this.props.attempting_login}
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
      </Form>
    );
  }
};

Login = connect((state) => {
  return {
    attempting_login: state.account.login.attempting_login,
  };
}, (dispatch) => {
  return {
    login: (username, password) => {
      dispatch(attemptLogin(username, password));
    },
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
    if(!this.props.attempting_login)
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
              disabled={this.props.attempting_login}
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
              disabled={this.props.attempting_login}
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
              disabled={this.props.attempting_login}
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
      </Form>
    );
  }
};

Register = connect((state) => {
  return {
    attempting_login: state.account.login.attempting_login,
  };
}, (dispatch) => {
  return {
    register: (username, email, password) => {
      dispatch(register(
        username,
        email,
        password));
    },
  }
})(Register);

export { Login, Register };

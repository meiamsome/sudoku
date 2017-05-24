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

import { attemptLogin } from '../../redux/actions';

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

export default Login;

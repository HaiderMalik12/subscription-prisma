import React, { Component } from 'react';
import './Login.css';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { saveToken } from '../utils';

class Login extends Component {
  state = {
    email: '',
    password: '',
    login: true
  };
  onChangeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { path } = this.props.match;
    return (
      <Mutation
        mutation={path === '/login' ? LOGIN_MUTATION : SIGNUP_MUTATION}
        variables={{ email: this.state.email, password: this.state.password }}
      >
        {(auth, { data, loading, error }) => {
          if (error) return <div>Error</div>;
          if (loading) return <div>Loading</div>;
          return (
            <div className="login-form">
              <form
                className="form-signin"
                onSubmit={async e => {
                  e.preventDefault();
                  let token = '';
                  if (path === '/login') {
                    const {
                      data: { login: authResults }
                    } = await auth();
                    token = authResults.token;
                  } else {
                    const {
                      data: { signup: authResults }
                    } = await auth();
                    token = authResults.token;
                  }
                  saveToken(token);
                  this.props.history.push('/');
                }}
              >
                <h1 className="h3 mb-3 font-weight-normal">
                  Please {path === '/login' ? 'sign in' : 'sign up'}
                </h1>
                <label htmlFor="inputEmail" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  placeholder="Email address"
                  onChange={this.onChangeHandler}
                  required
                  autoFocus
                  value={this.state.email}
                  name="email"
                />
                <label htmlFor="inputPassword" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="Password"
                  onChange={this.onChangeHandler}
                  required
                  value={this.state.password}
                  name="password"
                />
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  {path === '/login' ? 'Sign in' : 'Sign up'}
                </button>
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
export default Login;

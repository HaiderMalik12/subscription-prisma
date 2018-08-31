import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { isAuth, removeToken, AUTH_TOKEN } from '../utils';

class Header extends Component {
  state = {
    isAuth: false
  };
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          ELearning
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/feed">
                Feed
              </NavLink>
            </li>
            {authToken && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/published">
                  Published
                </NavLink>
              </li>
            )}
            {authToken && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/add">
                  Add Course
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {authToken ? (
              <React.Fragment>
                <li className="nav-item">
                  <div
                    className="nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      localStorage.removeItem(AUTH_TOKEN);
                      this.props.history.push('/');
                    }}
                  >
                    Logout
                  </div>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);

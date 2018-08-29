import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
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
              <Link className="nav-link" to="/feed">
                Feed
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/published">
                Published
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Add Course
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);

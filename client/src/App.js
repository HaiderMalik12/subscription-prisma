import React, { Component } from 'react';
import './App.css';
import Courses from './components/Courses';
import AddCourse from './components/AddCourse';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import EditCourse from './components/EditCourse1';
import { AuthRoute, UnauthRoute } from 'react-router-auth';
import Auth from './components/Auth';
import { AUTH_TOKEN } from './utils';

class App extends Component {
  render() {
    const isAuth = localStorage.getItem(AUTH_TOKEN) ? true : false;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <UnauthRoute
            exact
            path="/login"
            component={Auth}
            authenticated={isAuth}
            redirectTo="/feed"
          />
          <UnauthRoute
            exact
            path="/signup"
            component={Auth}
            authenticated={isAuth}
            redirectTo="/feed"
          />
          <Route
            exact
            path="/feed"
            component={Courses}
            authenticated={isAuth}
          />
          <AuthRoute
            exact
            path="/add"
            component={AddCourse}
            redirectTo="/login"
            authenticated={isAuth}
          />
          <AuthRoute
            exact
            path="/course/:id/edit"
            component={EditCourse}
            redirectTo="/login"
            authenticated={isAuth}
          />
        </Switch>
      </div>
    );
  }
}

export default App;

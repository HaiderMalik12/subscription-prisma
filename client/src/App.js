import React, { Component } from 'react';
import './App.css';
import Courses from './components/Courses';
import AddCourse from './components/AddCourse';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';
import EditCourse from './components/EditCourse1';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Login} />
          <Route exact path="/feed" component={Courses} />
          <Route exact path="/add" component={AddCourse} />
          <Route exact path="/course/:id/edit" component={EditCourse} />
        </Switch>
      </div>
    );
  }
}

export default App;

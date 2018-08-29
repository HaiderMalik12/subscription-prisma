import React, { Component } from 'react';
import './App.css';
import Courses from './components/Courses';
import AddCourse from './components/AddCourse';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/feed" component={Courses} />
          {/* <Route exact path="/courses/published" component={Courses} /> */}
          <Route exact path="/add" component={AddCourse} />
        </Switch>
      </div>
    );
  }
}

export default App;

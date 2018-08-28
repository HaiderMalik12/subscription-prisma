import React, { Component } from 'react';
import './App.css';
import Courses from './Courses';
import AddCourse from './AddCourse';

class App extends Component {
  render() {
    return (
      <div>
        <AddCourse />
        <Courses />
      </div>
    );
  }
}

export default App;

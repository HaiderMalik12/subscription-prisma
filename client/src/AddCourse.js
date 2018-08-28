import React, { Component } from 'react';
import './AddCourse.css';
class AddCourse extends Component {
  state = {
    name: '',
    description: ''
  };
  onChangeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  submitCourse = e => {
    e.preventDefault();
    console.log('submitted');
  };
  render() {
    return (
      <div className="conatiner center_div">
        <div className="card">
          <div className="card-title">
            <h3>Add Course</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.submitCourse}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={this.state.name}
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  value={this.state.description}
                  onChange={this.onChangeHandler}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block ">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddCourse;

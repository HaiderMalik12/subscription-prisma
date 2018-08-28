import React, { Component } from 'react';
import './AddCourse.css';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const CREATE_COURSE_MUTATION = gql`
  mutation CreateCourse($name: String!, $description: String!) {
    createCourse(name: $name, description: $description) {
      id
      name
      description
      isPublished
    }
  }
`;
// const COURSE_FEED_QUERY = gql`
// courseFeed {
//     id
//     name
//     description
//     isPublished
// }
// `
const COURSE_FEED_QUERY = gql`
  {
    courseFeed {
      id
      name
      description
      isPublished
    }
  }
`;
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
  submitCourse = (createCourse, e) => {
    e.preventDefault();
    createCourse({
      variables: {
        name: this.state.name,
        description: this.state.description
      }
    });
  };
  render() {
    return (
      <Mutation
        mutation={CREATE_COURSE_MUTATION}
        update={(cache, { data: { createCourse } }) => {
          const { courseFeed } = cache.readQuery({
            query: COURSE_FEED_QUERY
          });
          cache.writeQuery({
            query: COURSE_FEED_QUERY,
            data: { courseFeed: courseFeed.concat([createCourse]) }
          });
        }}
      >
        {(createCourse, { data }) => (
          <div className="conatiner center_div">
            <div className="card">
              <div className="card-title">
                <h3>Add Course</h3>
              </div>
              <div className="card-body">
                <form onSubmit={this.submitCourse.bind(this, createCourse)}>
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
        )}
      </Mutation>
    );
  }
}
export default AddCourse;

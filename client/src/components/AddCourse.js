import { gql } from 'apollo-boost';
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import './AddCourse.css';

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
  submitCourse = async (createCourse, e) => {
    e.preventDefault();
    await createCourse({
      variables: {
        name: this.state.name,
        description: this.state.description
      }
    });
  };
  render() {
    const renderCreateCourse = (createCourse, { data, error, loading }) => (
      <div className="conatiner center_div" style={{ marginTop: '20px' }}>
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
    );
    return (
      <Mutation
        mutation={CREATE_COURSE_MUTATION}
        update={(cache, mutationResults) => {
          const {
            data: { createCourse }
          } = mutationResults;
          //get courseFeed from the cache
          const { courseFeed } = cache.readQuery({
            query: COURSE_FEED_QUERY
          });
          //update the courseFeed in the cache
          cache.writeQuery({
            query: COURSE_FEED_QUERY,
            data: { courseFeed: courseFeed.concat([createCourse]) }
          });
        }}
        onCompleted={() => {
          this.props.history.replace('/');
        }}
      >
        {renderCreateCourse}
      </Mutation>
    );
  }
}
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
export default AddCourse;

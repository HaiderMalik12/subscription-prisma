import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation, Query } from 'react-apollo';

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
class EditCourse extends Component {
  //   state = {
  //     name: '',
  //     description: ''
  //   };
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.descInput = React.createRef();
  }
  componentDidMount() {
    //send query to fetch single course
    //set the state
  }
  submitCourse = async (createCourse, e) => {
    e.preventDefault();
    await createCourse({
      variables: {
        id: this.props.match.params.id,
        name: this.nameInput.current.value,
        description: this.descInput.current.value
      }
    });
  };
  render() {
    // const renderCreateCourse =
    return (
      <Query
        query={GET_COURSE_QUERY}
        variables={{ id: this.props.match.params.id }}
      >
        {({ data: { findCourseById: course }, error, loading }) => {
          if (error) return <div> Error </div>;
          if (loading) return <div> ....Loading </div>;
          return (
            <Mutation
              mutation={UPDATE_COURSE_MUTATION}
              //   update={(cache, mutationResults) => {
              //     const {
              //       data: { createCourse }
              //     } = mutationResults;
              //     //get courseFeed from the cache
              //     const { courseFeed } = cache.readQuery({
              //       query: COURSE_FEED_QUERY
              //     });
              //     //update the courseFeed in the cache
              //     cache.writeQuery({
              //       query: COURSE_FEED_QUERY,
              //       data: { courseFeed: courseFeed.concat([createCourse]) }
              //     });
              //   }}
              onCompleted={() => {
                this.props.history.replace('/');
              }}
            >
              {(updateCourse, { data, error, loading }) => (
                <div
                  className="conatiner center_div"
                  style={{ marginTop: '20px' }}
                >
                  <div className="card">
                    <div className="card-title">
                      <h3>Edit Course</h3>
                    </div>
                    <div className="card-body">
                      <form
                        onSubmit={this.submitCourse.bind(this, updateCourse)}
                      >
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            defaultValue={course.name}
                            ref={this.nameInput}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            defaultValue={course.description}
                            ref={this.descInput}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block "
                        >
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
const UPDATE_COURSE_MUTATION = gql`
  mutation UpdateCourse($id: ID!, $name: String, $description: String) {
    updateCourse(id: $id, name: $name, description: $description) {
      name
      id
      description
      isPublished
    }
  }
`;
const GET_COURSE_QUERY = gql`
  query GetCourseById($id: ID!) {
    findCourseById(id: $id) {
      id
      name
      description
      isPublished
    }
  }
`;
export default EditCourse;

import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation, Query } from 'react-apollo';

class EditCourse1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    };
  }
  saveToState = e => {
    let { name, value } = e.target;
    const course = { ...this.state.course };
    course[name] = value;
    this.setState({ course });
  };
  submitCourse = async (updateCourse, e) => {
    e.preventDefault();
    await updateCourse({
      variables: {
        id: this.props.match.params.id,
        name: this.state.course.name,
        description: this.state.course.description
      }
    });
  };
  render() {
    return (
      <Query
        query={COURSE_QUERY}
        variables={{ id: this.props.match.params.id }}
      >
        {({ data: { course }, error, loading }) => {
          if (error) return <div> Error </div>;
          if (loading) return <div> ....Loading </div>;
          return (
            <Mutation
              mutation={UPDATE_COURSE_MUTATION}
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
                            onChange={this.saveToState}
                            // ref={this.nameInput}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            defaultValue={course.description}
                            onChange={this.saveToState}
                            // ref={this.descInput}
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
const COURSE_QUERY = gql`
  query Course($id: ID!) {
    course(id: $id) {
      id
      name
      description
      isPublished
    }
  }
`;
export default EditCourse1;

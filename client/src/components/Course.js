import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN, COURSES_PER_PAGE } from '../constants';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner/Spinner';
import { COURSE_FEED_QUERY } from './Courses';
import PropTypes from 'prop-types';

class Course extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const { name, description, id } = this.props.course;
    return (
      <div className="card container">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text"> {description} </p>
          {authToken ? (
            <React.Fragment>
              <Link to={`course/${id}/edit`} className="btn btn-primary">
                Edit
              </Link>
              <Mutation
                mutation={DELETE_COURSE_MUTATION}
                variables={{ id }}
                update={(cache, { data: { deleteCourse } }) => {
                  debugger;
                  this.props.updateCacheAfterDelete(cache, deleteCourse);
                }}
              >
                {(deleteCourse, { data, error, loading }) => {
                  return (
                    <button
                      style={{ marginLeft: '10px' }}
                      className="btn btn-danger"
                      onClick={async () => {
                        await deleteCourse();
                      }}
                    >
                      Delete
                    </button>
                  );
                }}
              </Mutation>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
Course.propTypes = {
  updateCacheAfterDelete: PropTypes.func.isRequired
};
export const DELETE_COURSE_MUTATION = gql`
  mutation DeletCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
      name
    }
  }
`;
export default Course;

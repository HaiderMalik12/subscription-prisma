import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN, COURSES_PER_PAGE } from '../constants';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading/Loading';

class Courses extends React.Component {
  state = {
    page: 1
  };
  getQueryVariable = () => {
    const { page } = this.state;
    const skip = (page - 1) * COURSES_PER_PAGE;
    const first = COURSES_PER_PAGE;
    return {
      first,
      skip
    };
  };
  nextPage = data => {
    const { page } = this.state;
    const results = page <= data.courseFeed.count / COURSES_PER_PAGE;
    if (results) {
      this.setState(prevState => {
        return {
          page: prevState.page + 1
        };
      });
    }
  };
  prevPage = () => {
    const { page } = this.state;
    if (page > 1) {
      this.setState(prevState => ({
        page: prevState.page - 1
      }));
    }
  };
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div>
        <Query query={COURSE_FEED_QUERY} variables={this.getQueryVariable()}>
          {({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return <ErrorMessage error={error} />;
            return (
              <React.Fragment>
                {data.courseFeed.courses.map(
                  ({ id, description, name, isPublished }) => {
                    return (
                      <div key={id} className="card container">
                        <div className="card-body">
                          <h5 className="card-title">{name}</h5>
                          <p className="card-text"> {description} </p>
                          {authToken ? (
                            <React.Fragment>
                              <Link
                                to={`course/${id}/edit`}
                                className="btn btn-primary"
                              >
                                Edit
                              </Link>
                              <Mutation
                                mutation={DELETE_COURSE_MUTATION}
                                variables={{ id }}
                                update={(cache, { data: { deleteCourse } }) => {
                                  const { courseFeed } = cache.readQuery({
                                    query: COURSE_FEED_QUERY
                                  });
                                  cache.writeQuery({
                                    query: COURSE_FEED_QUERY,
                                    data: {
                                      courseFeed: courseFeed.filter(
                                        course => course.id !== deleteCourse.id
                                      )
                                    }
                                  });
                                }}
                              >
                                {(deleteCourse, { data, error, loading }) => {
                                  return (
                                    <React.Fragment>
                                      <button
                                        style={{ marginLeft: '10px' }}
                                        className="btn btn-danger"
                                        onClick={async () => {
                                          await deleteCourse();
                                        }}
                                      >
                                        Delete
                                      </button>
                                    </React.Fragment>
                                  );
                                }}
                              </Mutation>
                            </React.Fragment>
                          ) : null}
                        </div>
                      </div>
                    );
                  }
                )}
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <div
                        className="page-link"
                        style={{ cursor: 'pointer' }}
                        onClick={this.prevPage}
                      >
                        Previous
                      </div>
                    </li>
                    <li className="page-item">
                      <div
                        className="page-link"
                        style={{ cursor: 'pointer' }}
                        onClick={this.nextPage.bind(this, data)}
                      >
                        Next
                      </div>
                    </li>
                  </ul>
                </nav>
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export const DELETE_COURSE_MUTATION = gql`
  mutation DeletCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
      name
    }
  }
`;
export const COURSE_FEED_QUERY = gql`
  query CourseFeed($first: Int, $skip: Int) {
    courseFeed(first: $first, skip: $skip) {
      courses {
        createdAt
        id
        description
        name
        isPublished
        publishedBy {
          id
          email
        }
      }
      count
    }
  }
`;
export default Courses;

import React from 'react';
import { gql } from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

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
const DELETE_COURSE_MUTATION = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id) {
      id
      name
      description
      isPublished
    }
  }
`;
const Courses = () => {
  const renderCourses = ({ loading, error, data }) => {
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    return data.courseFeed.map(course => (
      <div key={course.id} className="container" style={{ marginTop: '20px' }}>
        <div className="row card">
          {/* <img
            className="card-img-top"
            src="https://source.unsplash.com/collection/1163637/480x480"
            alt="Card image cap"
          /> */}
          <div className="card-body">
            <h5 className="card-title">{course.name}</h5>
            <p className="card-text">{course.description}</p>
            <Link
              to={`/course/cjldkbdq58m4q0b00jzejh1no/edit`}
              className="btn btn-primary"
            >
              Edit
            </Link>

            <Mutation
              mutation={DELETE_COURSE_MUTATION}
              update={(cache, mutationResults) => {
                const {
                  data: { deleteCourse }
                } = mutationResults;
                //get courseFeed from the cache
                const { courseFeed } = cache.readQuery({
                  query: COURSE_FEED_QUERY
                });
                //update the courseFeed in the cache
                debugger;
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
              {(deletCourse, { data, error, loading }) => {
                return (
                  <button
                    className="btn btn-danger"
                    onClick={async () => {
                      await deletCourse({
                        variables: {
                          id: course.id
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                );
              }}
            </Mutation>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <Query
        query={gql`
          {
            courseFeed {
              id
              name
              description
              isPublished
            }
          }
        `}
      >
        {renderCourses}
      </Query>
    </div>
  );
};

export default Courses;

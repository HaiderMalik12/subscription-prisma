import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const Courses = () => {
  const renderCourses = ({ loading, error, data }) => {
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    return data.courseFeed.map(course => (
      <div className="container" style={{ marginTop: '20px' }}>
        <div key={course.id} className="row card" style={{ width: '18rem;' }}>
          {/* <img
            className="card-img-top"
            src="https://source.unsplash.com/collection/1163637/480x480"
            alt="Card image cap"
          /> */}
          <div className="card-body">
            <h5 class="card-title">{course.name}</h5>
            <p className="card-text">{course.description}</p>
            <Link to="/course/:id/details" className="btn btn-primary">
              Add To Cart
            </Link>
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

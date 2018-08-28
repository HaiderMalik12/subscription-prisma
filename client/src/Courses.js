import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const Courses = () => {
  const renderCourses = ({ loading, error, data }) => {
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error</p>;
    return data.courseFeed.map(course => (
      <div key={course.id}>
        <p>Name: {course.name}</p>
        <p>Description: {course.description}</p>
        <p>IsPublished: {course.isPublished.toString()}</p>
      </div>
    ));
  };
  return (
    <div>
      <h3>Courses</h3>
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

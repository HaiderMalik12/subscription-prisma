import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2> Not Found</h2>
      <pre>404</pre>
      <br />
      <Link to="/"> Home</Link>
    </div>
  );
};

export default NotFound;

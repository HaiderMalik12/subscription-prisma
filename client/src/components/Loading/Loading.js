import React from 'react';
import LoadingIcon from './loading_icon.gif';

const Loading = () => {
  return (
    <div>
      <img
        src={LoadingIcon}
        alt="...Loading"
        style={{ width: '200px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default Loading;

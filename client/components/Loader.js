import React from 'react';
import {DotLoader} from 'react-spinners';

const Loader = () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <DotLoader sizeUnit={'px'} size={100} color="#35234b" />
  </div>
);

export default Loader;

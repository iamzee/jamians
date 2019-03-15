import React from 'react';
import {DotLoader} from 'react-spinners';

const Loader = ({color}) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <DotLoader sizeUnit={'px'} size={100} color={color} />
  </div>
);

export default Loader;

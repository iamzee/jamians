import React from 'react';
import {SyncLoader} from 'react-spinners';

const PageLoader = () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <SyncLoader sizeUnit={'px'} size={30} margin={'6px'} color={'#1fab89'} />
  </div>
);

export default PageLoader;

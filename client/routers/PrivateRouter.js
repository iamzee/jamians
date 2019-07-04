import React from 'react';
import {Redirect, Route} from 'react-router-dom';

import {isAuthenticated} from '../helpers/auth';

const PrivateRoute = ({auth, component: Component, ...rest}) => {
  console.log (auth);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ()
          ? <Component {...props} />
          : <Redirect to="/login" />}
    />
  );
};

export default PrivateRoute;

import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({auth, component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      auth.user ? <Component {...props} /> : <Redirect to="/login" />}
  />
);

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect (mapStateToProps) (PrivateRoute);

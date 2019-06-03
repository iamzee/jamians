import React from 'react';
import PrivateRoute from './PrivateRouter';
import {Route} from 'react-router-dom';
import StartPage from '../Home/pages/StartPage';
import HomePage from '../Home/pages/HomePage';

const HomeRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/login" component={StartPage} />
      <PrivateRoute path="/" component={HomePage} />
    </React.Fragment>
  );
};

export default HomeRoutes;

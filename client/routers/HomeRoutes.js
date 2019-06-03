import React from 'react';
import PrivateRoute from './PrivateRouter';
import {Route} from 'react-router-dom';
import StartPage from '../Home/pages/StartPage';

const HomeRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/login" component={StartPage} />
    </React.Fragment>
  );
};

export default HomeRoutes;

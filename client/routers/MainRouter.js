import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import LoginPage from '../pages/LoginPage';

const MainRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginPage} />
    </Switch>
  </BrowserRouter>
);

export default MainRouter;

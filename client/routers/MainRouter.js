import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import PrivateRouter from './PrivateRouter';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import Header from '../components/Header';
import SignupPage from '../pages/SignupPage';
import UploadNotesPage from '../pages/UploadNotesPage';
import NotesPage from '../pages/NotesPage';

const MainRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/notes" component={NotesPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <PrivateRouter path="/notes/upload" component={UploadNotesPage} />
        <PrivateRouter path="/" component={HomePage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default MainRouter;

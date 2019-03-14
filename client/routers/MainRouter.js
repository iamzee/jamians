import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import PrivateRouter from './PrivateRouter';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import Header from '../components/Header';
import SignupPage from '../pages/SignupPage';
import UploadNotesPage from '../pages/UploadNotesPage';
import NotesPage from '../pages/NotesPage';
import NotesBookmarkPage from '../pages/NotesBookmarkPage';

const history = createHistory ();

const MainRouter = () => (
  <Router history={history}>
    <div>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/notes" component={NotesPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/notes/bookmarks" component={NotesBookmarkPage} />
        <Route path="/notes/upload" component={UploadNotesPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  </Router>
);

export default MainRouter;

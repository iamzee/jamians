import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import PrivateRoute from './PrivateRouter';
import LoginPage from '../Home/pages/LoginPage';
import HomePage from '../Home/pages/HomePage';
import SignupPage from '../Home/pages/SignupPage';
import UploadNotesPage from '../Notes/pages/UploadNotesPage';
import NotesPage from '../Notes/pages/NotesPage';
import NotesBookmarkPage from '../Notes/pages/NotesBookmarkPage';
import Note from '../Notes/components/Note';

const history = createHistory ();

const MainRouter = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute path="/notes/:noteId" component={Note} />
      <PrivateRoute exact path="/notes" component={NotesPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />
      <PrivateRoute path="/notes/bookmarks" component={NotesBookmarkPage} />
      <PrivateRoute path="/notes/upload" component={UploadNotesPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>
);

export default MainRouter;

import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import PrivateRoute from './PrivateRouter';
import UploadNotesPage from '../Notes/pages/UploadNotesPage';
import NotesPage from '../Notes/pages/NotesPage';
import NotesBookmarkPage from '../Notes/pages/NotesBookmarkPage';
import Note from '../Notes/components/Note';
import Upload from '../QuestionPaper/pages/Upload';
import QuestionPaperDashboard
  from '../QuestionPaper/pages/QuestionPaperDashboard';
import QuestionPaper from '../QuestionPaper/components/QusetionPaper';
import QuestionPaperBookmarkPage
  from '../QuestionPaper/pages/QuestionPaperBookmarkPage';

import DiscussionList from '../Discussion/pages/DiscussionList';
import NewDiscussionPage from '../Discussion/pages/NewDiscussionPage';
import Discussion from '../Discussion/pages/Discussion';
import Settings from '../Settings/pages/Settings';
import NewEventPage from '../Events/pages/NewEventPage';
import EventsListPage from '../Events/pages/EventsListPage';

import HomeRoutes from './HomeRoutes';

const history = createHistory ();

const MainRouter = () => (
  <Router history={history}>
    <Switch>
      <PrivateRoute path="/events/new" component={NewEventPage} />
      <PrivateRoute path="/events" component={EventsListPage} />
      <PrivateRoute path="/settings" component={Settings} />
      <PrivateRoute path="/discussion/new" component={NewDiscussionPage} />
      <PrivateRoute path="/discussion/:discussionId" component={Discussion} />
      <PrivateRoute path="/discussion" component={DiscussionList} />
      <PrivateRoute path="/question_papers/upload" component={Upload} />
      <PrivateRoute
        path="/question_papers/bookmarks"
        component={QuestionPaperBookmarkPage}
      />
      <PrivateRoute
        path="/question_papers/:questionPaperId"
        component={QuestionPaper}
      />
      <PrivateRoute
        path="/question_papers"
        component={QuestionPaperDashboard}
      />
      <PrivateRoute path="/notes/upload" component={UploadNotesPage} />
      <PrivateRoute path="/notes/bookmarks" component={NotesBookmarkPage} />
      <PrivateRoute path="/notes/:noteId" component={Note} />
      <PrivateRoute exact path="/notes" component={NotesPage} />
      <HomeRoutes />
    </Switch>
  </Router>
);

export default MainRouter;

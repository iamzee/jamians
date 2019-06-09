import React, {Suspense, lazy} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import PrivateRoute from './PrivateRouter';
import PageLoader from '../components/PageLoader';

// NOTE IMPORTS
const NotesPage = lazy (() => import ('../Notes/pages/NotesPage'));
const NotesBookmarkPage = lazy (() =>
  import ('../Notes/pages/NotesBookmarkPage')
);
const Note = lazy (() => import ('../Notes/pages/Note'));
const UploadNotesPage = lazy (() => import ('../Notes/pages/UploadNotesPage'));

// QUESTION PAPER IMPORTS
const Upload = lazy (() => import ('../QuestionPaper/pages/Upload'));
const QuestionPaperDashboard = lazy (() =>
  import ('../QuestionPaper/pages/QuestionPaperDashboard')
);
const QuestionPaper = lazy (() =>
  import ('../QuestionPaper/components/QusetionPaper')
);
const QuestionPaperBookmarkPage = lazy (() =>
  import ('../QuestionPaper/pages/QuestionPaperBookmarkPage')
);

// DISCUSSION IMPORTS
const DiscussionList = lazy (() =>
  import ('../Discussion/pages/DiscussionList')
);
const NewDiscussionPage = lazy (() =>
  import ('../Discussion/pages/NewDiscussionPage')
);
const Discussion = lazy (() => import ('../Discussion/pages/Discussion'));

// SETTINGS IMPORTS
const Settings = lazy (() => import ('../Settings/pages/Settings'));

// EVENT IMPORTS
const NewEventPage = lazy (() => import ('../Events/pages/NewEventPage'));
const EventsListPage = lazy (() => import ('../Events/pages/EventsListPage'));
const EventBookmarksPage = lazy (() =>
  import ('../Events/pages/EventBookmarksPage')
);
const EventEditPage = lazy (() => import ('../Events/pages/EventEditPage'));

// HOME IMPORTS
const StartPage = lazy (() => import ('../Home/pages/StartPage'));
const HomePage = lazy (() => import ('../Home/pages/HomePage'));

const history = createHistory ();

const MainRouter = () => (
  <Router history={history}>
    <Suspense fallback={<PageLoader />}>
      <Switch>

        {/* EVENT ROUTES */}
        <PrivateRoute path="/events/bookmarks" component={EventBookmarksPage} />
        <PrivateRoute path="/events/new" component={NewEventPage} />
        <PrivateRoute path="/events/:eventId/edit" component={EventEditPage} />
        <PrivateRoute path="/events" component={EventsListPage} />

        {/* SETTINGS ROUTES */}
        <PrivateRoute path="/settings" component={Settings} />

        {/* DISCUSSION ROUTES */}
        <PrivateRoute path="/discussion/new" component={NewDiscussionPage} />
        <PrivateRoute path="/discussion/:discussionId" component={Discussion} />
        <PrivateRoute path="/discussion" component={DiscussionList} />

        {/* QUESTION PAPER ROUTES */}
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

        {/* NOTE ROUTES */}
        <PrivateRoute path="/notes/upload" component={UploadNotesPage} />
        <PrivateRoute path="/notes/bookmarks" component={NotesBookmarkPage} />
        <PrivateRoute path="/notes/:noteId" component={Note} />
        <PrivateRoute exact path="/notes" component={NotesPage} />

        {/* HOME ROUTES */}
        <Route path="/login" component={StartPage} />
        <PrivateRoute exact path="/" component={HomePage} />
      </Switch>
    </Suspense>
  </Router>
);

export default MainRouter;

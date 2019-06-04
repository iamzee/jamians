import React from 'react';
import PrivateRoute from './PrivateRouter';
import {Route} from 'react-router-dom';
import UploadNotesPage from '../Notes/pages/UploadNotesPage';

const NoteRoutes = () => {
  return (
    <React.Fragment>
      <PrivateRoute path="/notes/upload" component={UploadNotesPage} />
    </React.Fragment>
  );
};

export default NoteRoutes;

import React from 'react';

import {getBookmarkedNotes} from '../api/note.api';
import {isAuthenticated} from '../helpers/auth.helper';

import NoteItem from '../components/NoteItem';
import NavBar from '../components/NavBar';

class NotesBookmarkPage extends React.Component {
  state = {
    notes: [],
  };

  componentDidMount () {
    const jwt = isAuthenticated ();
    getBookmarkedNotes (jwt.token, jwt.user._id).then (notes => {
      console.log (notes);
      this.setState (() => ({notes}));
    });
  }

  render () {
    return (
      <div>
        <NavBar title={'Notes Maina'} />
        {this.state.notes.map (note => <NoteItem key={note._id} note={note} />)}
      </div>
    );
  }
}

export default NotesBookmarkPage;

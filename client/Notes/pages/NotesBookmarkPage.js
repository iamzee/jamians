import React from 'react';

import {getBookmarkedNotes} from '../../api/note.api';
import {isAuthenticated} from '../../helpers/auth.helper';

import NoteItem from '../components/NoteItem';
import Navbar from '../components/Navbar';
import Loader from '../../components/Loader';

class NotesBookmarkPage extends React.Component {
  state = {
    notes: [],
    noNotes: false,
  };

  componentDidMount () {
    const jwt = isAuthenticated ();
    getBookmarkedNotes (jwt.token, jwt.user._id).then (notes => {
      this.setState (() => ({notes}));
      if (notes.length === 0) {
        this.setState (() => ({noNotes: true}));
      }
    });
  }

  render () {
    return (
      <div>
        <Navbar />
        {this.state.noNotes
          ? <p>No notes</p>
          : <div>
              {this.state.notes.length === 0
                ? <Loader />
                : <div>
                    {this.state.notes.map (note => (
                      <NoteItem key={note._id} note={note} />
                    ))}
                  </div>}
            </div>}
      </div>
    );
  }
}

export default NotesBookmarkPage;

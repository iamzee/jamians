import React from 'react';

import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';

import {getBookmarkedNotes} from '../../api/note.api';
import {isAuthenticated} from '../../helpers/auth.helper';

import NoteItem from '../components/NoteItem';
import Navbar from '../components/Navbar';
import Loader from '../../components/Loader';
import NoNotes from '../components/NoNotes';

const styles = theme => ({
  list: {
    maxWidth: 600,
    margin: 'auto',
  },
});

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
    const {classes} = this.props;
    return (
      <div>
        <Navbar />
        {this.state.noNotes
          ? <NoNotes />
          : <div>
              {this.state.notes.length === 0
                ? <Loader color="#00adb5" />
                : <List className={classes.list}>
                    {this.state.notes.map (note => (
                      <NoteItem key={note._id} note={note} />
                    ))}
                  </List>}
            </div>}
      </div>
    );
  }
}

export default withStyles (styles) (NotesBookmarkPage);

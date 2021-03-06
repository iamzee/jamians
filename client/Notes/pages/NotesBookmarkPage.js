import React from 'react';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import {getBookmarkedNotes} from '../../api/notes';
import {isAuthenticated} from '../../helpers/auth';
import NoteItem from '../components/NoteItem';
import Navbar from '../../components/Navbar';
import PageLoader from '../../components/PageLoader';
import NoNotes from '../components/NoNotes';
import NotesNav from '../components/NotesNav';

const styles = theme => ({
  list: {
    maxWidth: 600,
    margin: 'auto',
  },
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing (20),
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing (15),
      padding: theme.spacing (2),
    },
  },
  title: {
    fontWeight: 300,
  },
  notesSection: {
    marginTop: theme.spacing (2),
  },
});

class NotesBookmarkPage extends React.Component {
  state = {
    notes: [],
    noNotes: false,
  };

  componentDidMount = async () => {
    const {token} = isAuthenticated ();
    const notes = await getBookmarkedNotes (token);
    this.setState (() => ({notes}));
    if (notes.length === 0) {
      this.setState (() => ({noNotes: true}));
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Notes'} />

        <NotesNav />

        <div className={classes.root}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            Bookmarks
          </Typography>
          <Divider />

          <div className={classes.notesSection}>
            {this.state.noNotes
              ? <NoNotes />
              : <div>
                  {this.state.notes.length === 0
                    ? <PageLoader />
                    : <List className={classes.list}>
                        {this.state.notes.map (note => (
                          <NoteItem key={note._id} note={note} />
                        ))}
                      </List>}
                </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (NotesBookmarkPage);

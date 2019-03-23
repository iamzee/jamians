import React from 'react';
// import quesryString from 'query-string';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import NoteItem from '../components/NoteItem';
import Navbar from '../components/Navbar';
import Loader from '../../components/Loader';
import NoNotes from '../components/NoNotes';
import NotesFilter from '../components/NotesFilter';
import NotesList from '../components/NotesList';

import {listNotes} from '../../api/note.api';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
  },
  select: {
    marginBottom: theme.spacing.unit * 2,
    fontFamily: 'Roboto',
    flex: 1,
  },
  title: {
    fontWeight: 300,
    color: theme.notes.primary,
  },
});

class NotesPage extends React.Component {
  state = {
    notes: [],
    noNotes: false,
  };

  onDialogOpen = () => {
    this.setState (() => ({openDialog: true}));
  };

  render () {
    const queryString = this.props.location.search;
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Notes Mania'} />

        <div className={classes.root}>

          <Typography className={classes.title} variant="h4" gutterBottom>
            Notes
          </Typography>
          <Divider />

          <NotesFilter history={this.props.history} />

          <NotesList queryString={queryString} />

          {this.state.noNotes
            ? <NoNotes />
            : <div>
                {this.state.notes.length === 0
                  ? <Loader color="#00adb5" />
                  : <List>
                      {this.state.notes.map (note => (
                        <NoteItem key={note._id} note={note} />
                      ))}
                    </List>}
              </div>}
        </div>

      </div>
    );
  }
}

export default withStyles (styles) (NotesPage);

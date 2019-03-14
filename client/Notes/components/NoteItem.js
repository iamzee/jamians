import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {removeBookmark, addBookmark} from '../../api/note.api';
import {getSAS, download} from '../../api/upload.api';
import {isAuthenticated} from '../../helpers/auth.helper';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  content: {
    display: 'flex',
    flex: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: theme.spacing.unit * 2,
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.unit * 2,
  },
  title: {
    color: theme.notes.primary,
  },
  button: {
    backgroundColor: theme.notes.secondary,
    color: theme.notes.quaternary,
    '&:hover': {
      backgroundColor: theme.notes.primary,
    },
  },
});

class NoteItem extends React.Component {
  state = {
    bookmarked: false,
    addingBookmark: false,
    removingBookmark: false,
  };

  componentDidMount () {
    const {user} = isAuthenticated ();
    const matchedUser = this.props.note.bookmarks.find (
      bookmark => bookmark === user._id
    );

    if (matchedUser) {
      this.setState (() => ({bookmarked: true}));
    }
  }

  onView = () => {
    getSAS ().then (token => {
      const downloadLink = download (token, this.props.note.name);
      window.open (downloadLink, '_blank');
    });
  };

  onAddBookmark = () => {
    this.setState (() => ({addingBookmark: true}));

    const {user} = isAuthenticated ();
    const userId = user._id;
    const noteId = this.props.note._id;

    addBookmark (userId, noteId).then (() => {
      this.setState (() => ({bookmarked: true, addingBookmark: false}));
    });
  };

  onRemoveBookmark = () => {
    this.setState (() => ({removingBookmark: true}));

    const {user} = isAuthenticated ();
    const userId = user._id;
    const noteId = this.props.note._id;

    removeBookmark (userId, noteId).then (() => {
      this.setState (() => ({bookmarked: false, removingBookmark: false}));
    });
  };

  render () {
    const {note, classes, user} = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            {note.topic}
          </Typography>
          <Divider variant="middle" />
          <div className={classes.content}>
            <div>
              <Typography variant="caption">
                Description:
                <br />
                <span style={{fontWeight: 'bold'}}>{note.description}</span>
              </Typography>
              <Typography variant="caption">
                Uploaded On:
                <br />
                <span style={{fontWeight: 'bold'}}>
                  {moment (note.uploadedOn).format ('Mo MMM YYYY')}
                </span>
              </Typography>
              <Typography variant="caption">
                Uploaded By:
                <br />
                <span style={{fontWeight: 'bold'}}>{note.uploadedBy}</span>
              </Typography>
            </div>
            <div>
              <Typography variant="caption">
                Semester:
                <br />
                <span style={{fontWeight: 'bold'}}>{note.semester}</span>
              </Typography>
              <Typography variant="caption">
                Teacher:
                <br />
                <span style={{fontWeight: 'bold'}}>{note.teacher.name}</span>
              </Typography>
              <Typography variant="caption">
                Subject:
                <br />
                <span style={{fontWeight: 'bold'}}>{note.subject.name}</span>
              </Typography>
            </div>

          </div>

        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.onView}
          >
            View
          </Button>

          {this.state.bookmarked
            ? <Button
                variant="contained"
                onClick={this.onRemoveBookmark}
                className={classes.button}
              >
                {this.state.removingBookmark
                  ? 'Removing Bookmark'
                  : 'Remove Bookmark'}
              </Button>
            : <Button
                variant="contained"
                onClick={this.onAddBookmark}
                className={classes.button}
              >
                {this.state.addingBookmark ? 'Adding Bookmark' : 'Add Bookmark'}
              </Button>}
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect (mapStateToProps) (withStyles (styles) (NoteItem));

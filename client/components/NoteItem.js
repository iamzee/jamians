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

import {removeBookmark, addBookmark} from '../api/note.api';
import {isAuthenticated} from '../helpers/auth.helper';

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
});

class NoteItem extends React.Component {
  state = {
    bookmarked: false,
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

  onAddBookmark = () => {
    const {user} = isAuthenticated ();
    const userId = user._id;
    const noteId = this.props.note._id;

    addBookmark (userId, noteId).then (() => {
      this.setState (() => ({bookmarked: true}));
    });
  };

  onRemoveBookmark = () => {
    const {user} = isAuthenticated ();
    const userId = user._id;
    const noteId = this.props.note._id;

    removeBookmark (userId, noteId).then (() => {
      this.setState (() => ({bookmarked: false}));
    });
  };

  render () {
    const {note, classes, user} = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">{note.topic}</Typography>
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
          <Button variant="outlined" color="primary">View</Button>

          {this.state.bookmarked
            ? <Button
                variant="contained"
                color="primary"
                onClick={this.onRemoveBookmark}
              >
                Remove Bookmark
              </Button>
            : <Button
                variant="outlined"
                color="primary"
                onClick={this.onAddBookmark}
              >
                Add Bookmark
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

import React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import {withStyles} from '@material-ui/core/styles';

import {addBookmark, removeBookmark} from '../../api/note.api';
import {isAuthenticated} from '../../helpers/auth.helper';

import SnackbarContentWrapper from '../../components/SnackbarContentWrapper';

const styles = theme => ({
  button: {
    color: theme.notes.tertiary,
    marginRight: theme.spacing.unit * 2,
    '&:hover': {
      backgroundColor: theme.notes.tertiary,
      color: '#fff',
    },
  },
});

class BookmarkButton extends React.Component {
  state = {
    bookmarked: false,
    addingBookmark: false,
    removingBookmark: false,
    openAddBookmarkSnackbar: false,
    openRemoveBookmarkSnackbar: false,
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

  handleAddBookmarkSnackbarClose = () => {
    this.setState (() => ({openAddBookmarkSnackbar: false}));
  };

  handleRemoveBookmarkSnackbarClose = () => {
    this.setState (() => ({openRemoveBookmarkSnackbar: false}));
  };

  onAddBookmark = () => {
    this.setState (() => ({addingBookmark: true}));

    const {user} = isAuthenticated ();
    const userId = user._id;
    const noteId = this.props.note._id;

    addBookmark (userId, noteId).then (() => {
      this.setState (() => ({
        bookmarked: true,
        addingBookmark: false,
        openAddBookmarkSnackbar: true,
      }));
    });
  };

  onRemoveBookmark = () => {
    this.setState (() => ({removingBookmark: true}));

    const {user} = isAuthenticated ();
    const userId = user._id;
    const noteId = this.props.note._id;

    removeBookmark (userId, noteId).then (() => {
      this.setState (() => ({
        bookmarked: false,
        removingBookmark: false,
        openRemoveBookmarkSnackbar: true,
      }));
    });
  };

  render () {
    const {classes} = this.props;

    return (
      <div>
        {this.state.bookmarked
          ? <Button className={classes.button} onClick={this.onRemoveBookmark}>
              {this.state.removingBookmark
                ? 'Removing Bookmark'
                : 'Remove Bookmark'}
            </Button>
          : <Button className={classes.button} onClick={this.onAddBookmark}>
              {this.state.addingBookmark ? 'Adding Bookmark' : 'Add Bookmark'}
            </Button>}

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openAddBookmarkSnackbar}
          onClose={this.handleClose}
        >
          <SnackbarContentWrapper
            onClose={this.handleAddBookmarkSnackbarClose}
            variant="success"
            message="Added to bookmarks"
            className={classes.margin}
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openRemoveBookmarkSnackbar}
          onClose={this.handleClose}
        >
          <SnackbarContentWrapper
            onClose={this.handleRemoveBookmarkSnackbarClose}
            variant="success"
            message="Removed from bookmarks"
            className={classes.margin}
          />
        </Snackbar>
      </div>
    );
  }
}

export default withStyles (styles) (BookmarkButton);

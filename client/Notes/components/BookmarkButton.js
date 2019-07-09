import React from 'react';

import Button from '@material-ui/core/Button';

import {addBookmark, removeBookmark} from '../../api/notes';
import {isAuthenticated} from '../../helpers/auth';
import SnackbarComponent from '../../components/SnackbarComponent';

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
      bookmark => bookmark.toString () === user._id.toString ()
    );

    if (matchedUser) {
      this.setState (() => ({bookmarked: true}));
    }
  }

  onSnackbarClose = () => {
    this.setState (() => ({
      openAddBookmarkSnackbar: false,
      openRemoveBookmarkSnackbar: false,
    }));
  };

  onAddBookmark = async () => {
    this.setState (() => ({addingBookmark: true}));
    const noteId = this.props.note._id;

    await addBookmark (noteId);
    this.setState (() => ({
      bookmarked: true,
      addingBookmark: false,
      openAddBookmarkSnackbar: true,
    }));
  };

  onRemoveBookmark = async () => {
    this.setState (() => ({removingBookmark: true}));
    const noteId = this.props.note._id;

    await removeBookmark (noteId);
    this.setState (() => ({
      bookmarked: false,
      removingBookmark: false,
      openRemoveBookmarkSnackbar: true,
    }));
  };

  render () {
    return (
      <div>
        {this.state.bookmarked
          ? <Button color="secondary" onClick={this.onRemoveBookmark}>
              {this.state.removingBookmark
                ? 'Removing Bookmark...'
                : 'Remove Bookmark'}
            </Button>
          : <Button color="secondary" onClick={this.onAddBookmark}>
              {this.state.addingBookmark
                ? 'Adding Bookmark...'
                : 'Add Bookmark'}
            </Button>}

        {this.state.openAddBookmarkSnackbar &&
          <SnackbarComponent
            variant="success"
            message="Bookmark added!"
            onClose={this.onSnackbarClose}
          />}

        {this.state.openRemoveBookmarkSnackbar &&
          <SnackbarComponent
            variant="success"
            message="Bookmark removed!"
            onClose={this.onSnackbarClose}
          />}
      </div>
    );
  }
}

export default BookmarkButton;

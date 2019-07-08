import React from 'react';

import Button from '@material-ui/core/Button';

import {isAuthenticated} from '../../helpers/auth';
import {addBookmark, removeBookmark} from '../../api/questionPaper';
import SnackbarComponent from '../../components/SnackbarComponent';

class BookmarkButton extends React.Component {
  state = {
    bookmarked: false,
    loading: false,
    openAddBookmarkSnackbar: false,
    openRemoveBookmarkSnackbar: false,
  };

  componentDidMount = () => {
    const {user} = isAuthenticated ();
    const matchedUser = this.props.questionPaper.bookmarks.find (
      bookmark => bookmark.toString () === user._id.toString ()
    );

    if (matchedUser) {
      this.setState (() => ({bookmarked: true}));
    }
  };

  onSnackbarClose = () => {
    this.setState (() => ({
      openAddBookmarkSnackbar: false,
      openRemoveBookmarkSnackbar: false,
    }));
  };

  onAddBookmark = async () => {
    this.setState (() => ({loading: true}));

    const {questionPaper} = this.props;

    await addBookmark (questionPaper._id);
    this.setState (() => ({
      bookmarked: true,
      loading: false,
      openAddBookmarkSnackbar: true,
    }));
  };

  onRemoveBookmark = async () => {
    this.setState (() => ({loading: true}));

    const {questionPaper} = this.props;

    await removeBookmark (questionPaper._id);
    this.setState (() => ({
      bookmarked: false,
      loading: false,
      openRemoveBookmarkSnackbar: true,
    }));
  };

  render () {
    return (
      <div>
        {this.state.bookmarked
          ? <Button onClick={this.onRemoveBookmark}>
              {this.state.loading ? 'Removing...' : 'Remove Bookmark'}
            </Button>
          : <Button onClick={this.onAddBookmark}>
              {this.state.loading ? 'Adding...' : 'Add Bookmark'}
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

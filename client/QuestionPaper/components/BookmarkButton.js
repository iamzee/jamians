import React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../../helpers/auth.helper';
import {addBookmark, removeBookmark} from '../../api/questionPaper.api';

import SnackbarContentWrapper from '../../components/SnackbarContentWrapper';

const styles = theme => ({
  button: {
    color: theme.questionPaper.tertiary,
    marginRight: theme.spacing.unit * 2,
    '&:hover': {
      backgroundColor: theme.questionPaper.tertiary,
      color: '#fff',
    },
  },
});

class BookmarkButton extends React.Component {
  state = {
    bookmarked: false,
    loading: false,
    openAddBookmarkSnackbar: false,
    openRemoveBookmarkSnackbar: false,
  };

  componentDidMount () {
    const {questionPaper} = this.props;

    const {user} = isAuthenticated ();
    const matchedUser = questionPaper.bookmarks.find (
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
    this.setState (() => ({loading: true}));

    const {questionPaper} = this.props;
    const {user} = isAuthenticated ();

    addBookmark (questionPaper._id, user._id).then (() => {
      this.setState (() => ({
        bookmarked: true,
        loading: false,
        openAddBookmarkSnackbar: true,
      }));
    });
  };

  onRemoveBookmark = () => {
    this.setState (() => ({loading: true}));

    const {questionPaper} = this.props;
    const {user} = isAuthenticated ();

    removeBookmark (questionPaper._id, user._id).then (() => {
      this.setState (() => ({
        bookmarked: false,
        loading: false,
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
              {this.state.loading ? 'Removing...' : 'Remove Bookmark'}
            </Button>
          : <Button className={classes.button} onClick={this.onAddBookmark}>
              {this.state.loading ? 'Adding...' : 'Add Bookmark'}
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

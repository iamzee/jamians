import React from 'react';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {addBookmark, removeBookmark} from '../../api/note.api';
import {isAuthenticated} from '../../helpers/auth.helper';

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
      </div>
    );
  }
}

export default withStyles (styles) (BookmarkButton);

import React from 'react';

import Button from '@material-ui/core/Button';

import {isAuthenticated} from '../../helpers/auth.helper';
import {addBookmark, removeBookmark} from '../../api/questionPaper.api';

class BookmarkButton extends React.Component {
  state = {
    bookmarked: false,
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

  onAddBookmark = () => {
    const {questionPaper} = this.props;
    const {user} = isAuthenticated ();

    addBookmark (questionPaper._id, user._id).then (() => {
      this.setState (() => ({bookmarked: true}));
    });
  };

  onRemoveBookmark = () => {
    const {questionPaper} = this.props;
    const {user} = isAuthenticated ();

    removeBookmark (questionPaper._id, user._id).then (() => {
      this.setState (() => ({bookmarked: false}));
    });
  };

  render () {
    return (
      <div>
        {this.state.bookmarked
          ? <Button onClick={this.onRemoveBookmark}>Remove Bookmark</Button>
          : <Button onClick={this.onAddBookmark}>Add Bookmark</Button>}
      </div>
    );
  }
}

export default BookmarkButton;

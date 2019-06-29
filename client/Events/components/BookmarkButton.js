import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import BookmarkIconOutlined from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CircularProgress from '@material-ui/core/CircularProgress';

import {addBookmark, removeBookmark} from '../../api/event';
import {isAuthenticated} from '../../api/auth.api';

class BookmarkButton extends React.Component {
  state = {
    bookmarked: false,
    addingBookmark: false,
    removingBookmark: false,
  };

  componentDidMount() {
    isAuthenticated().then(user => {
      const matchedUser = this.props.event.bookmarks.find(
        bookmark => bookmark === user._id
      );

      if (matchedUser) {
        this.setState(() => ({bookmarked: true}));
      }
    });
  }

  onAddBookmark = () => {
    this.setState(() => ({addingBookmark: true}));

    const eventId = this.props.event._id;
    addBookmark(eventId).then(() => {
      this.setState(() => ({bookmarked: true, addingBookmark: false}));
    });
  };

  onRemoveBookmark = () => {
    this.setState(() => ({removingBookmark: true}));

    const eventId = this.props.event._id;
    removeBookmark(eventId).then(() => {
      this.setState(() => ({bookmarked: false, removingBookmark: false}));
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.bookmarked ? (
          <React.Fragment>
            {this.state.removingBookmark ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton onClick={this.onRemoveBookmark}>
                <BookmarkIcon />
              </IconButton>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.state.addingBookmark ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton onClick={this.onAddBookmark}>
                <BookmarkIconOutlined />
              </IconButton>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default BookmarkButton;

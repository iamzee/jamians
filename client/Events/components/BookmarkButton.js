import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

import {isAuthenticated} from '../../helpers/auth';
import {addBookmark, removeBookmark} from '../../api/event';

class BookmarkButton extends React.Component {
  state = {
    bookmark: false,
    adding: false,
    removing: false,
  };

  componentDidMount = () => {
    const {event} = this.props;
    const {user} = isAuthenticated();

    const matchedUser = event.bookmark.find(b => b._id === user._id);

    if (matchedUser) {
      this.setState(() => ({bookmark: true}));
    }
  };

  onAddBookmark = async () => {
    const {event} = this.props;
    const {token} = isAuthenticated();
    this.setState(() => ({adding: true}));
    await addBookmark(event._id, token);
    this.setState(() => ({bookmark: true, adding: false}));
  };

  onRemoveBookmark = async () => {
    const {event} = this.props;
    const {token} = isAuthenticated();
    this.setState(() => ({removing: true}));
    await removeBookmark(event._id, token);
    this.setState(() => ({bookmark: false, removing: false}));
  };

  render() {
    return (
      <React.Fragment>
        {this.state.bookmark ? (
          <React.Fragment>
            {this.state.removing ? (
              <CircularProgress color="secondary" size={20} />
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.onRemoveBookmark}
              >
                <CheckIcon style={{marginRight: '4px'}} />
                Bookmarked
              </Button>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.state.adding ? (
              <CircularProgress size={20} />
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.onAddBookmark}
              >
                Bookmark
              </Button>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default BookmarkButton;

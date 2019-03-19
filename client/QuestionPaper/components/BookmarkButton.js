import React from 'react';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {isAuthenticated} from '../../helpers/auth.helper';
import {addBookmark, removeBookmark} from '../../api/questionPaper.api';

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
    this.setState (() => ({loading: true}));

    const {questionPaper} = this.props;
    const {user} = isAuthenticated ();

    addBookmark (questionPaper._id, user._id).then (() => {
      this.setState (() => ({bookmarked: true, loading: false}));
    });
  };

  onRemoveBookmark = () => {
    this.setState (() => ({loading: true}));

    const {questionPaper} = this.props;
    const {user} = isAuthenticated ();

    removeBookmark (questionPaper._id, user._id).then (() => {
      this.setState (() => ({bookmarked: false, loading: false}));
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
      </div>
    );
  }
}

export default withStyles (styles) (BookmarkButton);

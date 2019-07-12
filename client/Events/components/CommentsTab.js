import React from 'react';
import moment from 'moment';

import CommentForm from './CommentForm';
import Comment from './Comment';
import {addComment} from '../../api/event';

class CommentsTab extends React.Component {
  state = {
    comments: this.props.event.comments.sort((a, b) => {
      if (moment(a.createdAt).isBefore(b.createdAt)) {
        return 1;
      }

      return -1;
    }),
  };

  addComment = async (data, cb) => {
    const event = await addComment(this.props.event._id, data);
    this.setState(() => ({
      comments: event.comments.sort((a, b) => {
        if (moment(a.createdAt).isBefore(b.createdAt)) {
          return 1;
        }

        return -1;
      }),
    }));
    cb();
  };

  render() {
    return (
      <div>
        <CommentForm addComment={this.addComment} />
        {this.state.comments.length > 0 &&
          this.state.comments.map(comment => (
            <Comment
              comment={comment}
              key={comment._id}
              eventId={this.props.event._id}
            />
          ))}
      </div>
    );
  }
}

export default CommentsTab;

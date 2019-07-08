import React from 'react';

import CommentListItem from './CommentListItem';

class CommentList extends React.Component {
  render () {
    const {comments} = this.props;
    return (
      <div>
        {comments.map (c => <CommentListItem key={c._id} comment={c} />)}
      </div>
    );
  }
}

export default CommentList;

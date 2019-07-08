import React from 'react';

import {listComment} from '../../api/event';
import {isAuthenticated} from '../../helpers/auth';
import CommentListItem from './CommentListItem';

class CommentList extends React.Component {
  state = {
    comments: [],
  };

  componentDidMount = async () => {
    const {socket} = this.props;

    socket.on ('comments', comments => {
      this.setState (() => ({comments}));
    });

    socket.on ('commentToClients', comment => {
      console.log ('COMMMMMMMM', comment);
    });

    // const {token} = isAuthenticated();
    // const comments = await listComment(
    //   this.props.discussion.event,
    //   this.props.discussion._id,
    //   token
    // );
    // this.setState(() => ({comments}));
  };

  render () {
    return (
      <div>
        {this.state.comments.length > 0 &&
          this.state.comments.map (c => (
            <CommentListItem key={c._id} comment={c} />
          ))}
      </div>
    );
  }
}

export default CommentList;

import React from 'react';

import DiscussionListItem from './DiscussionListItem';
import {listDiscussion} from '../../api/event';
import {isAuthenticated} from '../../helpers/auth';

class DiscussionList extends React.Component {
  state = {
    discussions: [],
  };

  componentDidMount = async () => {
    const {socket} = this.props;
    socket.emit ('loadDiscussion', this.props.event._id);
    socket.on ('discussions', discussions => {
      // console.log ('DISSSSSSSSSS', discussions);
      this.setState (() => ({discussions}));
    });

    socket.on ('discussionToClients', discussion => {
      this.setState (() => ({
        discussions: [discussion, ...this.state.discussions],
      }));
    });

    // const eventId = this.props.event._id;
    // const {token} = isAuthenticated ();
    // const discussions = await listDiscussion (eventId, token);
    // this.setState (() => ({discussions}));
  };

  render () {
    return (
      <div>
        {this.state.discussions.length > 0 &&
          <React.Fragment>
            {this.state.discussions.map (d => (
              <DiscussionListItem
                discussion={d}
                key={d._id}
                socket={this.props.socket}
              />
            ))}
          </React.Fragment>}
      </div>
    );
  }
}

export default DiscussionList;

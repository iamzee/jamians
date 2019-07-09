import React from 'react';

import AddDiscussion from './AddDiscussion';
import DiscussionList from './DiscussionList';
import {listDiscussion, addDiscussion} from '../../api/event';
import {isAuthenticated} from '../../helpers/auth';

let socket = '';

class EventDiscussion extends React.Component {
  state = {
    discussions: [],
  };

  onSubmit = async ({text}, eventId) => {
    const {token} = isAuthenticated ();
    const discussion = await addDiscussion ({text}, eventId, token);
    this.setState (() => ({
      discussions: [discussion, ...this.state.discussions],
    }));
  };

  componentDidMount = async () => {
    const eventId = this.props.event._id;
    const {token} = isAuthenticated ();
    const discussions = await listDiscussion (eventId, token);
    this.setState (() => ({discussions}));
  };

  render () {
    return (
      <div>
        <AddDiscussion event={this.props.event} onSubmit={this.onSubmit} />
        {this.state.discussions.length > 0 &&
          <DiscussionList discussions={this.state.discussions} />}
      </div>
    );
  }
}

export default EventDiscussion;

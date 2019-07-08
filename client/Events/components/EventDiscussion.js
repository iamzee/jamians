import React from 'react';

import AddDiscussion from './AddDiscussion';
import DiscussionList from './DiscussionList';

let socket = '';

class EventDiscussion extends React.Component {
  constructor (props) {
    super (props);
    socket = io ('http://localhost:3000/events');
  }

  render () {
    return (
      <div>
        <AddDiscussion event={this.props.event} socket={socket} />
        <DiscussionList event={this.props.event} socket={socket} />
      </div>
    );
  }
}

export default EventDiscussion;

import React from 'react';

import AddDiscussion from './AddDiscussion';
import DiscussionList from './DiscussionList';

class EventDiscussion extends React.Component {
  render() {
    return (
      <div>
        <AddDiscussion event={this.props.event} />
        <DiscussionList event={this.props.event} />
      </div>
    );
  }
}

export default EventDiscussion;

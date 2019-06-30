import React from 'react';

import AddDiscussion from './AddDiscussion';

class EventDiscussion extends React.Component {
  render() {
    return (
      <div>
        <AddDiscussion event={this.props.event} />
      </div>
    );
  }
}

export default EventDiscussion;

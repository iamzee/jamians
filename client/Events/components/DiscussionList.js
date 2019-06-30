import React from 'react';

import DiscussionListItem from './DiscussionListItem';
import {listDiscussion} from '../../api/event';
import {isAuthenticated} from '../../helpers/auth';

class DiscussionList extends React.Component {
  state = {
    discussions: [],
  };

  componentDidMount = async () => {
    const eventId = this.props.event._id;
    const {token} = isAuthenticated();
    const discussions = await listDiscussion(eventId, token);
    this.setState(() => ({discussions}));
  };

  render() {
    return (
      <div>
        {this.state.discussions.length > 0 && (
          <React.Fragment>
            {this.state.discussions.map(d => (
              <DiscussionListItem discussion={d} key={d._id} />
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default DiscussionList;

import React from 'react';

import DiscussionListItem from './DiscussionListItem';
import {listDiscussion} from '../../api/event';
import {isAuthenticated} from '../../helpers/auth';

class DiscussionList extends React.Component {
  // state = {
  //   discussions: [],
  // };

  // componentDidMount = async () => {
  //   const eventId = this.props.event._id;
  //   const {token} = isAuthenticated();
  //   const discussions = await listDiscussion(eventId, token);
  //   this.setState(() => ({discussions}));
  // };

  render () {
    const {discussions} = this.props;
    console.log ('DISCUSSIONS', discussions);
    return (
      <div>
        {discussions.map (d => (
          <DiscussionListItem discussion={d} key={d._id} />
        ))}
      </div>
    );
  }
}

export default DiscussionList;

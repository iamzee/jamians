import React from 'react';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';

import DiscussionNav from '../components/DiscussionNav';
import {listDiscussions} from '../../api/discussion.api';
import {isAuthenticated} from '../../helpers/auth.helper';
import DiscussionListItem from '../components/DiscussionListItem';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit * 5,
    [theme.breakpoints.down ('sm')]: {
      margin: theme.spacing.unit * 2,
    },
  },
  list: {
    marginTop: theme.spacing.unit * 2,
  },
});

class DiscussionList extends React.Component {
  state = {
    discussions: [],
  };

  componentDidMount () {
    const {token} = isAuthenticated ();

    listDiscussions (token).then (discussions => {
      this.setState (() => ({discussions}));
    });
  }

  render () {
    const {classes} = this.props;
    return (
      <div>
        <DiscussionNav />

        <div className={classes.container}>
          <Typography variant="h6">
            Discussions
          </Typography>
          <List className={classes.list}>
            {this.state.discussions.map (d => {
              return <DiscussionListItem key={d._id} discussion={d} />;
            })}
          </List>
        </div>

      </div>
    );
  }
}

export default withStyles (styles) (DiscussionList);

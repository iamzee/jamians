import React from 'react';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import DiscussionNav from '../components/DiscussionNav';
import {listDiscussions} from '../../api/discussion.api';
import DiscussionListItem from '../components/DiscussionListItem';
import Navbar from '../../components/Navbar';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 15,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
  },
  list: {
    marginTop: theme.spacing.unit * 2,
  },
  title: {
    fontWeight: 300,
  },
});

class DiscussionList extends React.Component {
  state = {
    discussions: [],
  };

  componentDidMount () {
    listDiscussions ().then (discussions => {
      this.setState (() => ({discussions}));
    });
  }

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Discussions'} />
        <DiscussionNav />

        <div className={classes.container}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Divider />
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

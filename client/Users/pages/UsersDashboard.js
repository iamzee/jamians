import React from 'react';

import {withStyles} from '@material-ui/core/styles';

import UserSearch from '../components/UserSearch';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 15,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 15,
      padding: theme.spacing.unit * 2,
    },
  },
});

class UsersDashboard extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <UserSearch />
      </div>
    );
  }
}

export default withStyles(styles)(UsersDashboard);

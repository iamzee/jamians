import React from 'react';

import {withStyles} from '@material-ui/core/styles';

import UserSearch from '../components/UserSearch';
import Navbar from '../../components/Navbar';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(10),
    padding: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(10),
      padding: theme.spacing(2),
    },
  },
});

class UsersDashboard extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Navbar title="Find People" />

        <div className={classes.root}>
          <UserSearch />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(UsersDashboard);

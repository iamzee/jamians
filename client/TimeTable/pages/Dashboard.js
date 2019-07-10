import React from 'react';

import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import ComingSoon from '../../components/ComingSoon';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing (10),
    padding: theme.spacing (5),
    [theme.breakpoints.down ('xs')]: {
      padding: theme.spacing (2),
    },
  },
});

function Dashboard (props) {
  const {classes} = props;
  return (
    <div>
      <Navbar title="Time Table" />

      <div className={classes.root}>
        <ComingSoon />
      </div>

    </div>
  );
}

export default withStyles (styles) (Dashboard);

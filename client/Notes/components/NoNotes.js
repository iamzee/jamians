import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters (),
    maxWidth: 600,
    margin: 'auto',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const NoNotes = props => {
  const {classes} = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography component="p">No notes.</Typography>
    </Paper>
  );
};

export default withStyles (styles) (NoNotes);

import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters (),
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const NoQuestionPaper = props => {
  const {classes} = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography component="p">No Question Paper</Typography>
    </Paper>
  );
};

export default withStyles (styles) (NoQuestionPaper);

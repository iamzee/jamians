import React from 'react';
import {Link} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
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

const HomePageNav = props => {
  const {classes, title, author, quote} = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Link to="/notes">
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Link>

        <Divider />
        <Typography variant="subtitle1">
          {quote}
        </Typography>
        <Typography variant="overline" gutterBottom>
          &#8208; {author}
        </Typography>
      </Paper>
    </div>
  );
};

export default withStyles (styles) (HomePageNav);

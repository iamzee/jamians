import React from 'react';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  title: {
    fontWeight: 300,
  },
});

function ComingSoon (props) {
  const {classes} = props;
  return (
    <div>
      <Typography variant="h4" gutterBottom className={classes.title}>
        Coming Soon...
      </Typography>
    </div>
  );
}

export default withStyles (styles) (ComingSoon);

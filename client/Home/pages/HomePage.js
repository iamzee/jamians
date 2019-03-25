import React from 'react';
import Navbar from '../components/Navbar';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import Counter from '../components/Counter';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
  },
  content: {
    padding: theme.spacing.unit * 2,
  },
});

class HomePage extends React.Component {
  componentDidMount () {}

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar />

        <div className={classes.root}>
          <div className={classes.content}>
            <Counter name={'Jamians'} />
            <Counter name={'Notes'} />
            <Counter name={'Question Papers'} />
          </div>

        </div>
      </div>
    );
  }
}

export default withStyles (styles) (HomePage);

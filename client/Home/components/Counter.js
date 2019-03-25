import React from 'react';
import CountUp from 'react-countup';

import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import {countUsers, countNotes, countQuestionPapers} from '../../api/home.api';

const styles = theme => ({
  count: {
    fontWeight: 300,
  },
  title: {
    fontSize: '50%',
  },
});

class Counter extends React.Component {
  state = {count: 0};

  componentDidMount () {
    if (this.props.name === 'Jamians') {
      countUsers ().then (count => {
        this.setState (() => ({count}));
      });
    } else if (this.props.name === 'Notes') {
      countNotes ().then (count => {
        this.setState (() => ({count}));
      });
    } else if (this.props.name === 'Question Papers') {
      countQuestionPapers ().then (count => {
        this.setState (() => ({count}));
      });
    }
  }

  render () {
    const {classes} = this.props;
    return (
      <CountUp start={0} end={this.state.count} duration={3} delay={0}>
        {({countUpRef}) => (
          <Typography gutterBottom className={classes.count} variant="h2">
            <span ref={countUpRef} />
            {' '}<span className={classes.title}>{this.props.name}</span>
          </Typography>
        )}
      </CountUp>
    );
  }
}

export default withStyles (styles) (Counter);

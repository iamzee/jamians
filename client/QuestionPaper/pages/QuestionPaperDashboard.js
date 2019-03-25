import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import Navbar from '../components/Navbar';
import QuestionPaperFilter from '../components/QuestionPaperFilter';
import QuestionPaperList from '../components/QuestionPaperList';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
  },
  title: {
    fontWeight: 300,
    color: theme.questionPaper.primary,
  },
  filters: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

class QuestionPaperDashboard extends React.Component {
  render () {
    const {classes} = this.props;
    const queryString = this.props.location.search;
    return (
      <div>
        <Navbar />
        <div className={classes.root}>

          <Typography className={classes.title} variant="h4" gutterBottom>
            Question Papers
          </Typography>
          <Divider />

          <div className={classes.filters}>
            <QuestionPaperFilter history={this.props.history} />
          </div>

          <QuestionPaperList queryString={queryString} />

        </div>
      </div>
    );
  }
}

export default withStyles (styles) (QuestionPaperDashboard);
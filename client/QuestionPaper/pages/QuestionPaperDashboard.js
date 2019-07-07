import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import Navbar from '../../components/Navbar';
import QuestionPaperNav from '../components/QuestionPaperNav';
import QuestionPaperFilter from '../components/QuestionPaperFilter';
import QuestionPaperList from '../components/QuestionPaperList';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing (20),
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing (15),
      padding: theme.spacing (2),
    },
  },
  title: {
    fontWeight: 300,
    color: theme.questionPaper.primary,
  },
  filters: {
    marginTop: theme.spacing (2),
    marginBottom: theme.spacing (2),
  },
});

class QuestionPaperDashboard extends React.Component {
  render () {
    const {classes} = this.props;
    const queryString = this.props.location.search;
    return (
      <div>
        <Navbar title={'Question Papers'} />
        <QuestionPaperNav />

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

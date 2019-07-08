import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {read} from '../../api/questionPaper';
import {getSAS, download} from '../../api/upload';

import Navbar from '../../components/Navbar';
import QuestionPaperNav from '../components/QuestionPaperNav';
import PageLoader from '../../components/PageLoader';
import BookmarkButton from '../components/BookmarkButton';

const styles = theme => ({
  container: {
    marginTop: theme.spacing (20),
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing (15),
      paddingLeft: theme.spacing (1),
      paddingRight: theme.spacing (1),
    },
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing (2),
  },
  contentBody: {
    marginTop: theme.spacing (2),
  },
  button: {
    marginRight: theme.spacing (2),
  },
});

class QuestionPaper extends React.Component {
  state = {
    questionPaper: null,
  };

  componentDidMount = async () => {
    const {questionPaperId} = this.props.match.params;

    const questionPaper = await read (questionPaperId);
    this.setState (() => ({questionPaper}));
  };

  handleView = async () => {
    const sasToken = await getSAS ('question-papers');
    const downloadLink = download (
      sasToken,
      'question-papers',
      this.state.questionPaper.name
    );
    window.open (downloadLink, '_blank');
  };

  render () {
    const {questionPaper} = this.state;
    const {classes} = this.props;

    return (
      <div>
        <Navbar title={'Question Papers'} />
        <QuestionPaperNav />

        <div className={classes.container}>
          {questionPaper
            ? <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Question Paper
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {questionPaper.year}
                  </Typography>
                  <Divider />
                  <div className={classes.contentBody}>
                    <Typography variant="caption">
                      Department:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {questionPaper.department.name}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Course:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {questionPaper.course.name}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Subject:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {questionPaper.subject.name}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Semester:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {questionPaper.semester}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Uploaded By:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {questionPaper.createdBy.name}
                      </span>
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleView}
                    className={classes.button}
                  >
                    View
                  </Button>
                  <BookmarkButton questionPaper={questionPaper} />
                </CardActions>
              </Card>
            : <PageLoader />}
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (QuestionPaper);

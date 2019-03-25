import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {readQuestionPaper} from '../../api/questionPaper.api';

import Navbar from '../components/Navbar';
import Loader from '../../components/Loader';
import BookmarkButton from '../components/BookmarkButton';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing.unit * 2,
  },
  contentBody: {
    marginTop: theme.spacing.unit * 2,
  },
  button: {
    color: theme.questionPaper.tertiary,
    marginRight: theme.spacing.unit * 2,
    '&:hover': {
      backgroundColor: theme.questionPaper.tertiary,
      color: '#fff',
    },
  },
});

class QuestionPaper extends React.Component {
  state = {
    questionPaper: null,
  };

  componentDidMount () {
    const {questionPaperId} = this.props.match.params;

    readQuestionPaper (questionPaperId).then (questionPaper => {
      console.log (questionPaper);
      this.setState (() => ({questionPaper}));
    });
  }

  render () {
    const {questionPaper} = this.state;
    const {classes} = this.props;

    return (
      <div>
        <Navbar />
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
                    Department:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>
                      {questionPaper.department.name}
                    </span>
                  </Typography>
                  <Typography variant="caption">
                    Course:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>
                      {questionPaper.course.name}
                    </span>
                  </Typography>
                  <Typography variant="caption">
                    Subject:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>
                      {questionPaper.subject.name}
                    </span>
                  </Typography>
                  <Typography variant="caption">
                    Semester:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>
                      {questionPaper.semester}
                    </span>
                  </Typography>
                  <Typography variant="caption">
                    Uploaded By:
                    {' '}
                    <span style={{fontWeight: 'bold'}}>
                      {questionPaper.uploadedBy.name}
                    </span>
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <Button className={classes.button}>View</Button>
                <BookmarkButton questionPaper={questionPaper} />
              </CardActions>
            </Card>
          : <Loader color={'#e23e57'} />}
      </div>
    );
  }
}

export default withStyles (styles) (QuestionPaper);

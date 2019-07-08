import React from 'react';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import {getBookmarkedQuestionPapers} from '../../api/questionPaper';

import QuestionPaperItem from '../components/QuestionPaperItem';
import PageLoader from '../../components/PageLoader';
import NoQuestionPaper from '../components/NoQuestionPaper';
import Navbar from '../../components/Navbar';
import QuestionPaperNav from '../components/QuestionPaperNav';

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
  },
  list: {
    marginTop: theme.spacing (2),
  },
});

class QuestionPaperBookmarkPage extends React.Component {
  state = {
    questionPapers: [],
    noBookmarks: false,
  };

  componentDidMount = async () => {
    const questionPapers = await getBookmarkedQuestionPapers ();
    this.setState (() => ({questionPapers}));

    if (questionPapers.length === 0) {
      this.setState (() => ({noBookmarks: true}));
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Question Papers'} />
        <QuestionPaperNav />

        <div className={classes.root}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Bookmarks
          </Typography>
          <Divider />
          {this.state.noBookmarks
            ? <NoQuestionPaper />
            : <div>
                {this.state.questionPapers.length === 0
                  ? <PageLoader />
                  : <List className={classes.list}>
                      {this.state.questionPapers.map ((questionPaper, i) => (
                        <QuestionPaperItem
                          key={questionPaper._id}
                          i={i}
                          questionPaper={questionPaper}
                        />
                      ))}
                    </List>}
              </div>}
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (QuestionPaperBookmarkPage);

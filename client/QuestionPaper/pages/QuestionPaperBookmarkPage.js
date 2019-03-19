import React from 'react';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import {getBookmarkedQuestionPapers} from '../../api/questionPaper.api';
import {isAuthenticated} from '../../helpers/auth.helper';

import QuestionPaperItem from '../components/QuestionPaperItem';
import Loader from '../../components/Loader';
import Navbar from '../components/Navbar';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
  },
  title: {
    fontWeight: 300,
    color: theme.questionPaper.primary,
  },
  list: {
    marginTop: theme.spacing.unit * 2,
  },
});

class QuestionPaperBookmarkPage extends React.Component {
  state = {
    questionPapers: [],
    noBookmarks: false,
  };

  componentDidMount () {
    const {token} = isAuthenticated ();
    getBookmarkedQuestionPapers (token).then (questionPapers => {
      this.setState (() => ({questionPapers}));

      if (questionPapers.length === 0) {
        this.setState (() => ({noBookmarks: true}));
      }
    });
  }

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar />

        <div className={classes.root}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Bookmarks
          </Typography>
          <Divider />
          {this.state.noBookmarks
            ? <div>No bookmarks</div>
            : <div>
                {this.state.questionPapers.length === 0
                  ? <Loader color={'#e23e57'} />
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

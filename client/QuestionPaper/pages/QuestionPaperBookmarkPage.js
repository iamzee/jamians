import React from 'react';

import {getBookmarkedQuestionPapers} from '../../api/questionPaper.api';
import {isAuthenticated} from '../../helpers/auth.helper';

import QuestionPaperItem from '../components/QuestionPaperItem';
import Loader from '../../components/Loader';
import Navbar from '../components/Navbar';

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
    return (
      <div>
        <Navbar />

        {this.state.noBookmarks
          ? <div>No bookmarks</div>
          : <div>
              {this.state.questionPapers.length === 0
                ? <Loader color={'#e23e57'} />
                : <div>
                    {this.state.questionPapers.map ((questionPaper, i) => (
                      <QuestionPaperItem
                        key={questionPaper._id}
                        i={i}
                        questionPaper={questionPaper}
                      />
                    ))}
                  </div>}
            </div>}
      </div>
    );
  }
}

export default QuestionPaperBookmarkPage;

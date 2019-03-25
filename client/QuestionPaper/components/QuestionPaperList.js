import React from 'react';
import queryString from 'query-string';

import List from '@material-ui/core/List';

import {listQuestionPapers} from '../../api/questionPaper.api';

import QuestionPaperItem from './QuestionPaperItem';
import Loader from '../../components/Loader';

class QuestionPaperList extends React.Component {
  state = {
    questionPapers: [],
  };

  componentDidMount () {
    const parsed = queryString.parse (this.props.queryString);

    listQuestionPapers (parsed).then (questionPapers => {
      this.setState (() => ({questionPapers}));
    });
  }

  componentDidUpdate (prevProps) {
    if (this.props.queryString !== prevProps.queryString) {
      this.setState (() => ({questionPapers: []}));
      const parsed = queryString.parse (this.props.queryString);
      listQuestionPapers (parsed).then (questionPapers => {
        this.setState (() => ({questionPapers}));
      });
    }
  }

  render () {
    return (
      <div>
        {this.state.noQuestionPaper
          ? <p>No question paper</p>
          : <div>
              {this.state.questionPapers.length === 0
                ? <Loader color={'#e23e57'} />
                : <List>
                    {this.state.questionPapers.map ((questionPaper, i) => (
                      <QuestionPaperItem
                        key={questionPaper._id}
                        questionPaper={questionPaper}
                        i={i}
                      />
                    ))}
                  </List>}
            </div>}
      </div>
    );
  }
}

export default QuestionPaperList;

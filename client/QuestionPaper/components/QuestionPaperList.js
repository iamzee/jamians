import React from 'react';
import queryString from 'query-string';

import List from '@material-ui/core/List';

import {listQuestionPapers} from '../../api/questionPaper';
import QuestionPaperItem from './QuestionPaperItem';
import PageLoader from '../../components/PageLoader';
import NoQuestionPaper from './NoQuestionPaper';

class QuestionPaperList extends React.Component {
  state = {
    questionPapers: [],
    noQuestionPaper: false,
  };

  componentDidMount = async () => {
    const query = queryString.parse (this.props.queryString);

    const questionPapers = await listQuestionPapers (query);
    this.setState (() => ({questionPapers}));

    if (questionPapers.length === 0) {
      this.setState (() => ({noQuestionPaper: true}));
    }
  };

  componentDidUpdate = async prevProps => {
    if (this.props.queryString !== prevProps.queryString) {
      this.setState (() => ({questionPapers: []}));
      const parsed = queryString.parse (this.props.queryString);
      const questionPapers = await listQuestionPapers (parsed);
      this.setState (() => ({questionPapers, noQuestionPaper: false}));

      if (questionPapers.length === 0) {
        this.setState (() => ({noQuestionPaper: true}));
      }
    }
  };

  render () {
    return (
      <div>
        {this.state.noQuestionPaper
          ? <NoQuestionPaper />
          : <div>
              {this.state.questionPapers.length === 0
                ? <PageLoader />
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

import React from 'react';
import queryString from 'query-string';

import List from '@material-ui/core/List';

import {listQuestionPapers} from '../../api/questionPaper.api';

import QuestionPaperItem from './QuestionPaperItem';
import Loader from '../../components/Loader';
import NoQuestionPaper from './NoQuestionPaper';

class QuestionPaperList extends React.Component {
  state = {
    questionPapers: [],
    noQuestionPaper: false,
  };

  componentDidMount() {
    const query = queryString.parse(this.props.queryString);

    listQuestionPapers(query).then(questionPapers => {
      this.setState(() => ({questionPapers}));

      if (questionPapers.length === 0) {
        this.setState(() => ({noQuestionPaper: true}));
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.queryString !== prevProps.queryString) {
      this.setState(() => ({questionPapers: []}));
      const parsed = queryString.parse(this.props.queryString);
      listQuestionPapers(parsed).then(questionPapers => {
        this.setState(() => ({questionPapers, noQuestionPaper: false}));

        if (questionPapers.length === 0) {
          this.setState(() => ({noQuestionPaper: true}));
        }
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.noQuestionPaper ? (
          <NoQuestionPaper />
        ) : (
          <div>
            {this.state.questionPapers.length === 0 ? (
              <Loader color={'#e23e57'} />
            ) : (
              <List>
                {this.state.questionPapers.map((questionPaper, i) => (
                  <QuestionPaperItem
                    key={questionPaper._id}
                    questionPaper={questionPaper}
                    i={i}
                  />
                ))}
              </List>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default QuestionPaperList;

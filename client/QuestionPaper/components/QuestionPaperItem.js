import React from 'react';
import {ListItem, ListItemText} from '@material-ui/core';

class QuestionPaperItem extends React.Component {
  render () {
    const {questionPaper, i} = this.props;
    return (
      <ListItem button>
        <ListItemText
          primary={`Paper${i + 1}`}
          secondary={questionPaper.year}
        />
      </ListItem>
    );
  }
}

export default QuestionPaperItem;

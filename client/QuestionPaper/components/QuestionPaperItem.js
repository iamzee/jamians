import React from 'react';
import {Link} from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.tertiary,
    },
  },
});

class QuestionPaperItem extends React.Component {
  render () {
    const {questionPaper, i, classes} = this.props;
    return (
      <Link
        to={`/question_papers/${questionPaper._id}`}
        className={classes.link}
      >
        <ListItem button className={classes.listItem}>
          <ListItemText
            primary={`Paper ${i + 1}`}
            secondary={questionPaper.year}
          />
        </ListItem>
      </Link>
    );
  }
}

export default withStyles (styles) (QuestionPaperItem);

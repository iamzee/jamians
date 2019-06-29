import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import ArticleEditor from './ArticleEditor';
import getEditorState from '../../helpers/getEditorState';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2, 2),
  },
  editor: {
    marginTop: theme.spacing(2),
  },
});

class EventAbout extends React.Component {
  render() {
    const {event, classes} = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Details
          </Typography>
          <Divider />
          <div className={classes.editor}>
            <ArticleEditor
              readOnly={true}
              editorState={getEditorState(event.body)}
              onChange={() => {}}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(EventAbout);

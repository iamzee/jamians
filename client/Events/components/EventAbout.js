import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';

import ArticleEditor from './ArticleEditor';
import getEditorState from '../../helpers/getEditorState';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(2),
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

        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Going
          </Typography>
          <Divider />
          <List>
            {event.going.map(g => {
              return (
                <ListItem key={g._id}>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={g.name} />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(EventAbout);

import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core/styles';

import config from '../../config/config';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
  },
});

const NoteItem = ({note, classes}) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">{note.topic}</Typography>
        <Typography variant="body2">{note.description}</Typography>
        <Typography variant="caption">
          {moment (note.uploadedOn).format ('Mo MMM YYYY')}
        </Typography>
        <Divider variant="middle" />
        <Typography variant="caption">
          Uploaded By:
          {' '}
          <span style={{fontWeight: 'bold'}}>{note.uploadedBy}</span>
        </Typography>
        <Typography variant="caption">
          Teacher: <span style={{fontWeight: 'bold'}}>{note.teacher.name}</span>
        </Typography>
        <Typography variant="caption">
          Subject: <span style={{fontWeight: 'bold'}}>{note.subject.name}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <a target="_blank" href={`${config.awsDownloadUrl}/${note.note_url}`}>
          Download
        </a>
      </CardActions>
    </Card>
  );
};

export default withStyles (styles) (NoteItem);

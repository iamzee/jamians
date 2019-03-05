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
        <Typography>{note.topic}</Typography>
        <Typography>{note.description}</Typography>
        <Typography>
          Uploaded On: {moment (note.uploadedOn).format ('Mo MMM YYYY')}
        </Typography>
        <Divider variant="middle" />
        <Typography>Uploaded By: {note.uploadedBy}</Typography>
        <Typography>Teacher: {note.teacher.name}</Typography>
        <Typography>Subject: {note.subject.name}</Typography>
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

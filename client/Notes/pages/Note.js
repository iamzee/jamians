import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import {readNote} from '../../api/notes';
import {isAuthenticated} from '../../helpers/auth';
import BookmarkButton from '../components/BookmarkButton';
import Navbar from '../../components/Navbar';
import PageLoader from '../../components/PageLoader';
import NotesNav from '../components/NotesNav';
import DeleteButton from '../components/DeleteButton';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
  },

  container: {
    marginTop: theme.spacing (20),
    [theme.breakpoints.down ('xs')]: {
      marginTop: theme.spacing (15),
    },
  },
  contentBody: {
    marginTop: theme.spacing (2),
  },
  link: {
    textDecoration: 'none',
  },
});

class Note extends React.Component {
  state = {
    note: null,
  };

  componentDidMount = async () => {
    const {noteId} = this.props.match.params;
    const note = await readNote (noteId);
    this.setState (() => ({note}));
  };

  render () {
    const {note} = this.state;
    const {classes} = this.props;
    const {user} = isAuthenticated ();

    return (
      <div>
        <Navbar title={'Notes'} />
        <NotesNav />
        <div className={classes.container}>
          {note
            ? <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {note.topic}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {note.description}
                  </Typography>
                  <Divider />
                  <div className={classes.contentBody}>
                    <Typography variant="caption">
                      Uploaded On:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {moment (note.uploadedOn).format ('Mo MMM YYYY')}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Uploaded By:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {note.createdBy.name}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Semester:{' '}
                      <span style={{fontWeight: 'bold'}}>{note.semester}</span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Department:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {note.department.name}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Course:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {note.course.name}
                      </span>
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      Subject:{' '}
                      <span style={{fontWeight: 'bold'}}>
                        {note.subject.name}
                      </span>
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <a
                    className={classes.link}
                    target="_blank"
                    href={`http://localhost:3000/api/notes/${note._id}/download`}
                  >
                    <Button color="secondary" component="span">View</Button>
                  </a>

                  <BookmarkButton note={note} />
                  {user._id.toString () === note.createdBy._id.toString () &&
                    <DeleteButton note={note} history={this.props.history} />}
                </CardActions>
              </Card>
            : <PageLoader />}
        </div>
      </div>
    );
  }
}

export default withStyles (styles) (Note);

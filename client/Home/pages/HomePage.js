import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import NotesIcon from '@material-ui/icons/ClassOutlined';
import QuestionPaperIcon from '@material-ui/icons/SchoolOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import EventIcon from '@material-ui/icons/EventOutlined';
import HelpIcon from '@material-ui/icons/ContactSupportOutlined';
import SyllabusIcon from '@material-ui/icons/AssignmentOutlined';
import TimeTableIcon from '@material-ui/icons/CalendarTodayOutlined';
import FaceIcon from '@material-ui/icons/Face';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  appbar: {background: theme.palette.primary.main},
  title: {flexGrow: 1},
  container: {
    marginTop: theme.spacing (10),
    padding: theme.spacing (5),
    [theme.breakpoints.down ('xs')]: {
      padding: theme.spacing (2),
    },
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'black',
  },
  linkText: {
    marginLeft: theme.spacing (2),
  },
});

const HomePage = props => {
  const {classes} = props;
  return (
    <div>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Jamian Rivets
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/notes">
              <NotesIcon />
              <Typography className={classes.linkText} variant="h6">
                Notes
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/question_papers">
              <QuestionPaperIcon />
              <Typography className={classes.linkText} variant="h6">
                QuestionPapers
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/notes">
              <SyllabusIcon />
              <Typography className={classes.linkText} variant="h6">
                Syllabus
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/notes">
              <TimeTableIcon />
              <Typography className={classes.linkText} variant="h6">
                TimeTable
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/events">
              <EventIcon />
              <Typography className={classes.linkText} variant="h6">
                Events
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/users">
              <FaceIcon />
              <Typography className={classes.linkText} variant="h6">
                Find People
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/settings">
              <SettingsIcon />
              <Typography className={classes.linkText} variant="h6">
                Settings
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/notes">
              <HelpIcon />
              <Typography className={classes.linkText} variant="h6">
                Help
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withStyles (styles) (HomePage);

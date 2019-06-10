import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import NotesIcon from '@material-ui/icons/ClassOutlined';
import QuestionPaperIcon from '@material-ui/icons/SchoolOutlined';
import DiscussionIcon from '@material-ui/icons/QuestionAnswerOutlined';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import EventIcon from '@material-ui/icons/EventOutlined';
import NavigationIcon from '@material-ui/icons/NavigationOutlined';
import HelpIcon from '@material-ui/icons/ContactSupportOutlined';
import SyllabusIcon from '@material-ui/icons/AssignmentOutlined';
import TimeTableIcon from '@material-ui/icons/CalendarTodayOutlined';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import ConfessIcon from '@material-ui/icons/NaturePeopleOutlined';
import NewFeaturesIcon from '@material-ui/icons/NewReleasesOutlined';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  appbar: {background: theme.palette.primary.main},
  title: {flexGrow: 1},
  container: {
    marginTop: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 5,
    [theme.breakpoints.down ('xs')]: {
      padding: theme.spacing.unit * 2,
    },
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'black',
  },
  linkText: {
    marginLeft: theme.spacing.unit * 2,
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
        <Grid container spacing={8}>
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
            <Link className={classes.link} to="/discussion">
              <DiscussionIcon />
              <Typography className={classes.linkText} variant="h6">
                Discussion
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
            <Link className={classes.link} to="/notes">
              <ConfessIcon />
              <Typography className={classes.linkText} variant="h6">
                Confession
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/notes">
              <ShoppingCartIcon />
              <Typography className={classes.linkText} variant="h6">
                Buy / Sell
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/notes">
              <NavigationIcon />
              <Typography className={classes.linkText} variant="h6">
                Navigate
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/notes">
              <NewFeaturesIcon />
              <Typography className={classes.linkText} variant="h6">
                New Features
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link className={classes.link} to="/notes">
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

import React from 'react';
import {Link} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NotesIcon from '@material-ui/icons/ClassOutlined';
import QuestionPaperIcon from '@material-ui/icons/SchoolOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import EventIcon from '@material-ui/icons/EventOutlined';
import HelpIcon from '@material-ui/icons/ContactSupportOutlined';
import SyllabusIcon from '@material-ui/icons/AssignmentOutlined';
import TimeTableIcon from '@material-ui/icons/CalendarTodayOutlined';
import FaceIcon from '@material-ui/icons/FaceOutlined';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import {isAuthenticated} from '../helpers/auth';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(5),
  },
  grow: {
    flexGrow: 1,
    color: '#fff',
  },
  iconButton: {
    marginRight: theme.spacing(1),
    color: '#fff',
  },
  list: {
    width: 250,
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.tertiary,
    },
    display: 'flex',
    alignItems: 'center',
    color: 'black',
  },
  listTitle: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  listTitleText: {
    color: '#fff',
  },
  listItemText: {
    paddingLeft: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
  },
  navButton: {
    color: '#fff',
  },
  avatar: {
    margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: 150,
    height: 150,
  },
  avatarSection: {
    textAlign: 'center',
  },
});

class Navbar extends React.Component {
  state = {
    open: false,
    redirectToSignup: false,
    redirectToLogin: false,
    department: '',
    course: '',
    user: null,
    avatarLink: null,
    count: null,
  };

  toggleDrawer = open => () => {
    this.setState(() => ({open}));
  };

  render() {
    const {classes} = this.props;
    const {user} = isAuthenticated();
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="fixed" styles={{backgroundColor: this.props.color}}>
            <Toolbar>
              <IconButton
                className={classes.iconButton}
                onClick={this.toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.grow}>
                {this.props.title}
              </Typography>
              {this.state.count >= 0 && (
                <Link className={classes.link} to="/notifications">
                  <IconButton>
                    <Badge badgeContent={this.state.count} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Link>
              )}
            </Toolbar>
          </AppBar>
        </div>

        <div>
          <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onKeyDown={this.toggleDrawer(false)}
              onClick={this.toggleDrawer(false)}
              style={{height: '100%'}}
            >
              <div className={classes.list} style={{height: '100%'}}>
                <div className={classes.avatarSection}>
                  {user.avatar ? (
                    <Avatar
                      className={classes.avatar}
                      src={`http://${window.location.host}/api/users/${
                        user._id
                      }/avatar`}
                    />
                  ) : (
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                  )}

                  <Typography variant="h6">{user.name}</Typography>
                </div>

                <List>
                  <Link to="/notes" className={classes.link}>
                    <ListItem button className={classes.listItem}>
                      <NotesIcon />
                      <ListItemText
                        primary={'Notes'}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  </Link>

                  <Link to="/question_papers" className={classes.link}>
                    <ListItem button className={classes.listItem}>
                      <QuestionPaperIcon />
                      <ListItemText
                        primary={'Question Papers'}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  </Link>

                  <Link to="/syllabus" className={classes.link}>
                    <ListItem button className={classes.listItem}>
                      <SyllabusIcon />
                      <ListItemText
                        primary={'Syllabus'}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  </Link>

                  <Link to="/timetable" className={classes.link}>
                    <ListItem button className={classes.listItem}>
                      <TimeTableIcon />
                      <ListItemText
                        primary={'Time Table'}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  </Link>

                  <Link to="/events" className={classes.link}>
                    <ListItem button className={classes.listItem}>
                      <EventIcon />
                      <ListItemText
                        primary={'Events'}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  </Link>

                  <Link to="/users" className={classes.link}>
                    <ListItem button className={classes.listItem}>
                      <FaceIcon />
                      <ListItemText
                        primary={'Find People'}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  </Link>

                  {/* <Link to="/settings" className={classes.link}>
                    <ListItem button className={classes.listItem}>
                      <SettingsIcon />
                      <ListItemText
                        primary={'Settings'}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  </Link> */}

                  <ListItem button className={classes.listItem}>
                    <HelpIcon />
                    <ListItemText
                      primary={'Help'}
                      className={classes.listItemText}
                    />
                  </ListItem>
                </List>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);

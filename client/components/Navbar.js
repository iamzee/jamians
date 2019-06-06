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
import Divider from '@material-ui/core/Divider';
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 5,
  },
  grow: {
    flexGrow: 1,
    color: '#fff',
  },
  appbar: {
    backgroundColor: theme.home.primary,
  },
  iconButton: {
    marginRight: theme.spacing.unit,
    color: '#fff',
  },
  list: {
    width: 250,
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.home.secondary,
    },
    display: 'flex',
    alignItems: 'center',
    color: 'black',
  },
  listTitle: {
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.home.primary,
  },
  listTitleText: {
    color: '#fff',
  },
  link: {
    textDecoration: 'none',
  },
  navButton: {
    color: '#fff',
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
  },
  listPrimary: {
    flexGrow: 1,
  },
});

class Navbar extends React.Component {
  state = {
    open: false,
    redirectToSignup: false,
    redirectToLogin: false,
    department: '',
    course: '',
  };

  toggleDrawer = open => () => {
    this.setState(() => ({open}));
  };

  render() {
    const {classes} = this.props;

    return (
      <div>
        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appbar}>
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
                <div className={classes.listTitle}>
                  <Typography variant="h5" className={classes.listTitleText}>
                    Jamians
                  </Typography>
                </div>

                <Divider variant="middle" />

                <List className={classes.navList} style={{height: '88%'}}>
                  <div className={classes.listPrimary}>
                    <Link
                      to={`/notes?departmentId=${
                        this.state.department
                      }&courseId=${this.state.course}`}
                      className={classes.link}
                    >
                      <ListItem button className={classes.listItem}>
                        <NotesIcon />
                        <ListItemText primary={'Notes'} />
                      </ListItem>
                    </Link>

                    <Link
                      to={`/question_papers?departmentId=${
                        this.state.department
                      }&courseId=${this.state.course}`}
                      className={classes.link}
                    >
                      <ListItem button className={classes.listItem}>
                        <QuestionPaperIcon />
                        <ListItemText primary={'Question Papers'} />
                      </ListItem>
                    </Link>

                    <ListItem button className={classes.listItem}>
                      <SyllabusIcon />
                      <ListItemText primary={'Syllabus'} />
                    </ListItem>

                    <ListItem button className={classes.listItem}>
                      <TimeTableIcon />
                      <ListItemText primary={'Time Table'} />
                    </ListItem>

                    <Link to="/discussion" className={classes.link}>
                      <ListItem button className={classes.listItem}>
                        <DiscussionIcon />
                        <ListItemText primary={'Discussion'} />
                      </ListItem>
                    </Link>

                    <Link to="/events" className={classes.link}>
                      <ListItem button className={classes.listItem}>
                        <EventIcon />
                        <ListItemText primary={'Events'} />
                      </ListItem>
                    </Link>

                    <ListItem button className={classes.listItem}>
                      <ConfessIcon />
                      <ListItemText primary={'Confess'} />
                    </ListItem>

                    <ListItem button className={classes.listItem}>
                      <ShoppingCartIcon />
                      <ListItemText primary={'Buy / Sell'} />
                    </ListItem>

                    <ListItem button className={classes.listItem}>
                      <NavigationIcon />
                      <ListItemText primary={'Navigate'} />
                    </ListItem>

                    <ListItem button className={classes.listItem}>
                      <NewFeaturesIcon />
                      <ListItemText primary={'New Features'} />
                    </ListItem>

                    <Link to="/settings" className={classes.link}>
                      <ListItem button className={classes.listItem}>
                        <SettingsIcon />
                        <ListItemText primary={'Settings'} />
                      </ListItem>
                    </Link>

                    <ListItem button className={classes.listItem}>
                      <HelpIcon />
                      <ListItemText primary={'Help'} />
                    </ListItem>
                  </div>
                  <div className={classes.listSecondary}>
                    <ListItem button className={classes.listItem}>
                      <LogoutIcon />
                      <ListItemText
                        onClick={this.onLogoutClick}
                        primary={'Logout'}
                      />
                    </ListItem>
                  </div>
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

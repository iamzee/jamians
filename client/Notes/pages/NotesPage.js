import React from 'react';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import List from '@material-ui/core/List';

import NoteItem from '../components/NoteItem';
import Navbar from '../components/Navbar';
import Loader from '../../components/Loader';
import NoNotes from '../components/NoNotes';

import {listDepartments, readDepartment} from '../../api/department.api';
import {getFilteredNotes, listNotes} from '../../api/note.api';
import {isAuthenticated} from '../../helpers/auth.helper';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
  },
  select: {
    marginBottom: theme.spacing.unit * 2,
    fontFamily: 'Roboto',
    flex: 1,
  },
});

class NotesPage extends React.Component {
  state = {
    subjects: [],
    subject: null,
    departments: [],
    department: null,
    filteredNotes: [],
    noNotes: false,
  };

  componentDidMount () {
    listDepartments ().then (departments => {
      this.setState (() => ({departments}));
    });

    const {user} = isAuthenticated ();
    getFilteredNotes (user.department._id).then (notes => {
      this.setState (() => ({
        filteredNotes: notes,
        subjects: user.department.subjects,
        department: {value: user.department._id, label: user.department.name},
      }));
    });
  }

  onDepartmentChange = department => {
    if (department) {
      this.setState (() => ({department, filteredNotes: [], subject: null}));

      readDepartment (department.value).then (({subjects}) => {
        this.setState (() => ({subjects}));
      });

      getFilteredNotes (department.value).then (notes => {
        this.setState (() => ({filteredNotes: notes, noNotes: false}));

        if (notes.length === 0) {
          this.setState (() => ({noNotes: true}));
        }
      });
    } else {
      this.setState (() => ({department: null, fileterdNotes: []}));
      listNotes ().then (notes => {
        this.setState (() => ({filteredNotes: notes, noNotes: false}));
      });
    }
  };

  onSubjectChange = subject => {
    if (subject) {
      this.setState (() => ({subject, filteredNotes: []}));

      getFilteredNotes (
        this.state.department.value,
        subject.value
      ).then (notes => {
        this.setState (() => ({filteredNotes: notes, noNotes: false}));

        if (notes.length === 0) {
          this.setState (() => ({noNotes: true}));
        }
      });
    } else {
      this.setState (() => ({subject: null, filteredNotes: []}));

      getFilteredNotes (this.state.department.value).then (notes => {
        this.setState (() => ({filteredNotes: notes, noNotes: false}));

        if (notes.length === 0) {
          this.setState (() => ({noNotes: true}));
        }
      });
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Notes Mania'} />

        <div className={classes.root}>
          <div className={classes.filter}>
            <Select
              value={this.state.department}
              className={classes.select}
              placeholder="Search notes by Department"
              options={this.state.departments.map (department => {
                return {
                  value: department._id,
                  label: department.name,
                };
              })}
              onChange={this.onDepartmentChange}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#00adb5',
                  primary: '#393e46',
                },
              })}
            />

            <Select
              value={this.state.subject}
              isClearable
              className={classes.select}
              placeholder="Search notes by Subject"
              options={this.state.subjects.map (subject => {
                return {
                  value: subject._id,
                  label: subject.name,
                };
              })}
              onChange={this.onSubjectChange}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#00adb5',
                  primary: '#393e46',
                },
              })}
            />
          </div>

          {this.state.noNotes
            ? <NoNotes />
            : <div>
                {this.state.filteredNotes.length === 0
                  ? <Loader color="#00adb5" />
                  : <List>
                      {this.state.filteredNotes.map (note => (
                        <NoteItem key={note._id} note={note} />
                      ))}
                    </List>}
              </div>}
        </div>

      </div>
    );
  }
}

export default withStyles (styles) (NotesPage);

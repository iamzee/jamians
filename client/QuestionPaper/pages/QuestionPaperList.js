import React from 'react';
import Select from 'react-select';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';

import {getQuestionPapers} from '../../api/questionPaper.api';
import {listDepartments, readDepartment} from '../../api/department.api';
import {isAuthenticated} from '../../helpers/auth.helper';
import {semesters} from '../../helpers/note.helper';

import QuestionPaperItem from '../components/QuestionPaperItem';
import Navbar from '../components/Navbar';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
  },
  select: {
    fontFamily: 'Roboto',
    marginBottom: theme.spacing.unit * 2,
  },
  select2: {
    width: '55%',
    fontFamily: 'Roboto',
    marginBottom: theme.spacing.unit * 2,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textField: {
    width: '40%',
    marginBottom: theme.spacing.unit * 2,
  },
  list: {
    marginTop: theme.spacing.unit * 2,
  },
  cssLabel: {
    '&$cssFocused': {
      color: theme.questionPaper.primary,
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: theme.questionPaper.primary,
    },
  },
  notchedOutline: {},
});

class QuestionPaperList extends React.Component {
  state = {
    questionPapers: [],
    departments: [],
    subjects: [],
    department: null,
    subject: null,
    semester: '',
  };

  componentDidMount () {
    listDepartments ().then (departments => {
      this.setState (() => ({departments}));
    });

    const {user} = isAuthenticated ();
    getQuestionPapers ({
      departmentId: user.department._id,
    }).then (questionPapers => {
      this.setState (() => ({
        questionPapers,
        subjects: user.department.subjects,
        department: {value: user.department._id, label: user.department.name},
      }));
    });
  }

  onDepartmentChange = department => {
    console.log (department);
    // Change department state and subjects to NULL
    this.setState (() => ({department, subjects: [], subject: null}));

    // Getting subjects asscoiated with a particular department
    readDepartment (department.value).then (({subjects}) => {
      this.setState (() => ({subjects}));
    });

    // Getting filteredQUestionPapers associated with a department
    getQuestionPapers ({
      departmentId: department.value,
      subjectId: this.state.subject ? this.state.subject.value : '',
      semester: this.state.semester ? this.state.semester : '',
    }).then (questionPapers => {
      this.setState (() => ({questionPapers}));
    });
  };

  onSubjectChange = subject => {
    // Change subject state
    this.setState (() => ({subject}));

    // Get filtered question papers
    getQuestionPapers ({
      departmentId: this.state.department.value,
      subjectId: subject.value,
      semester: this.state.semester ? this.state.semester : '',
    }).then (questionPapers => {
      this.setState (() => ({questionPapers}));
    });
  };

  onSemesterChange = e => {
    const semester = e.target.value;
    this.setState (() => ({semester}));

    getQuestionPapers ({
      departmentId: this.state.department.value,
      subjectId: this.state.subject ? this.state.subject.value : '',
      semester,
    }).then (questionPapers => {
      this.setState (() => ({questionPapers}));
    });
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <Select
            className={classes.select}
            value={this.state.department}
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
                primary25: '#e23e57',
                primary: '#522546',
              },
            })}
          />
          <div className={classes.flex}>
            <Select
              className={classes.select2}
              value={this.state.subject}
              options={this.state.subjects.map (subject => {
                return {value: subject._id, label: subject.name};
              })}
              onChange={this.onSubjectChange}
              theme={theme => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#e23e57',
                  primary: '#522546',
                },
              })}
            />
            <TextField
              className={classes.textField}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              select
              margin="normal"
              label="Semester"
              variant="outlined"
              value={this.state.semester}
              onChange={this.onSemesterChange}
            >
              {semesters.map (semester => (
                <MenuItem key={semester.value} value={semester.value}>
                  {semester.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Divider variant="middle" />

          <List className={classes.list}>
            {this.state.questionPapers.map ((questionPaper, i) => (
              <QuestionPaperItem
                key={questionPaper._id}
                questionPaper={questionPaper}
                i={i}
              />
            ))}
          </List>

        </div>
      </div>
    );
  }
}

export default withStyles (styles) (QuestionPaperList);

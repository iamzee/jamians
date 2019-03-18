import React from 'react';
import Select from 'react-select';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import {getQuestionPapers} from '../../api/questionPaper.api';
import {listDepartments, readDepartment} from '../../api/department.api';
import {isAuthenticated} from '../../helpers/auth.helper';
import {semesters} from '../../helpers/note.helper';

import QuestionPaperItem from '../components/QuestionPaperItem';

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
    return (
      <div>
        <Select
          value={this.state.department}
          options={this.state.departments.map (department => {
            return {
              value: department._id,
              label: department.name,
            };
          })}
          onChange={this.onDepartmentChange}
        />
        <Select
          value={this.state.subject}
          options={this.state.subjects.map (subject => {
            return {value: subject._id, label: subject.name};
          })}
          onChange={this.onSubjectChange}
        />
        <TextField
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

        {this.state.questionPapers.map ((questionPaper, i) => (
          <QuestionPaperItem
            key={questionPaper._id}
            questionPaper={questionPaper}
            i={i}
          />
        ))}

      </div>
    );
  }
}

export default QuestionPaperList;

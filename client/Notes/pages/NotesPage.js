import React from 'react';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';

import NoteItem from '../components/NoteItem';
import Navbar from '../components/Navbar';
import Loader from '../../components/Loader';
import NoNotes from '../components/NoNotes';

import {listSubjects} from '../../api/subject.api';
import {startGetNotes, startGetFilteredNotes} from '../../actions/note.action';

const styles = theme => ({
  select: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  },
});

class NotesPage extends React.Component {
  state = {
    subjects: [],
    subjectId: null,
    filteredNotes: [],
    noNotes: false,
  };

  componentDidMount () {
    this.props.dispatch (startGetNotes ()).then (() => {
      this.setState (() => ({filteredNotes: this.props.notes}));
    });

    listSubjects ().then (subjects => {
      this.setState (() => ({subjects}));
    });
  }

  onSubjectChange = e => {
    if (e) {
      const subjectId = e.value;

      this.setState (() => ({fileterdNotes: []}));
      this.props.dispatch (startGetFilteredNotes (subjectId)).then (() => {
        this.setState (() => ({filteredNotes: this.props.notes}));

        if (this.state.filteredNotes.length === 0) {
          this.setState (() => ({noNotes: true}));
        } else {
          this.setState (() => ({noNotes: false}));
        }
      });
    } else {
      this.props.dispatch (startGetNotes ()).then (() => {
        this.setState (() => ({
          filteredNotes: this.props.notes,
          noNotes: false,
        }));
      });
    }
  };

  render () {
    const {classes} = this.props;
    return (
      <div>
        <Navbar title={'Notes Mania'} />

        <Select
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
        />

        {this.state.noNotes
          ? <NoNotes />
          : <div>
              {this.state.filteredNotes.length === 0
                ? <Loader />
                : <div>
                    {this.state.filteredNotes.map (note => (
                      <NoteItem key={note._id} note={note} />
                    ))}
                  </div>}
            </div>}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  notes: state.notes,
});

export default connect (mapStateToProps) (withStyles (styles) (NotesPage));

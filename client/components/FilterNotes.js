import React from 'react';
import Select from 'react-select';

import {TextField, Paper, MenuItem} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

import {listSubjects} from '../api/subject.api';

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: 'auto',
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});

function inputComponent({inputRef, ...props}) {
  return <div ref={inputRef} {...props} />;
}

function Control (props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option (props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Menu (props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  Option,
};

class FilterNotes extends React.Component {
  state = {
    subjects: [],
    suggestions: [],
    subject: '',
  };

  onSubjectChange = ({value, label}) => {
    this.setState (() => ({subject: label}));
    this.props.getSubjectId (value);
  };

  componentDidMount () {
    listSubjects ().then (subjects => {
      this.setState (() => ({subjects}));

      const suggestions = subjects.map (subject => ({
        value: subject._id,
        label: subject.name,
      }));

      this.setState (() => ({suggestions}));
    });
  }

  render () {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Select
          classes={classes}
          options={this.state.suggestions}
          components={components}
          placeholder="Filter by subjects"
          isClearable
          value={this.state.subject}
          onChange={this.onSubjectChange}
        />
      </div>
    );
  }
}

export default withStyles (styles) (FilterNotes);

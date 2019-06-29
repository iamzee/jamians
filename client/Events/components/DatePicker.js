import React from 'react';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class DatePicker extends React.Component {
  state = {
    date: moment (),
    focused: false,
  };

  render () {
    return (
      <SingleDatePicker
        date={this.state.date}
        onDateChange={date => this.setState (() => ({date}))}
        focused={this.state.focused}
        onFocusChange={({focused}) => this.setState (() => ({focused}))}
        id="123"
        numberOfMonths={1}
      />
    );
  }
}

export default DatePicker;

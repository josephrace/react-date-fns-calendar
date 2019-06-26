import React from 'react';
import {
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  format as formatDate,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isToday,
  isSameMonth,
} from 'date-fns';
import './Calendar.css';

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  handleSelectDate = date => {
    this.setState({
      selectedDate: date,
    });
  };

  handleSelectMonth = date => {
    this.setState({
      currentMonth: date,
    });
  };

  handlePrevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    });
  };

  handleNextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
    });
  };

  renderHeader() {
    return (
      <div className="calendar-header">
        <div className="calendar-prev" onClick={this.handlePrevMonth}>
          &lt; Previous
        </div>
        <div
          className="calendar-current"
          onClick={() => this.handleSelectMonth(new Date())}
        >
          {formatDate(this.state.currentMonth, 'MMMM YYYY')}
        </div>
        <div className="calendar-next" onClick={this.handleNextMonth}>
          Next &gt;
        </div>
      </div>
    );
  }

  renderDays() {
    const weekStart = startOfWeek(this.state.currentMonth, {
      weekStartsOn: this.props.weekStartsOn,
    });
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-day" key={i}>
          {formatDate(addDays(weekStart, i), 'dddd')}
        </div>
      );
    }

    return <div className="calendar-days">{days}</div>;
  }

  renderCells() {
    const monthStart = startOfMonth(this.state.currentMonth);
    const monthEnd = endOfMonth(this.state.currentMonth);
    const dateStart = startOfWeek(monthStart, {
      weekStartsOn: this.props.weekStartsOn,
    });
    const dateEnd = endOfWeek(monthEnd, {
      weekStartsOn: this.props.weekStartsOn,
    });
    const dates = [];
    let date = dateStart;

    while (date <= dateEnd) {
      const thisDate = date;
      let classes = 'calendar-cell';

      if (isSameDay(date, this.state.selectedDate)) {
        classes += ' calendar-cell--selected';
      }

      if (isToday(date)) {
        classes += ' calendar-cell--today';
      }

      if (!isSameMonth(date, this.state.currentMonth)) {
        classes += ' calendar-cell--disabled';
      }

      dates.push(
        <div
          className={classes}
          key={date}
          onClick={() =>
            isSameMonth(thisDate, this.state.currentMonth) &&
            this.handleSelectDate(thisDate)
          }
        >
          <div className="calendar-cell__date">{formatDate(date, 'D')}</div>
          {this.props.events.map(event => {
            if (isSameDay(date, event.date)) {
              return <div className="calendar-event">{event.name}</div>;
            }
          })}
        </div>
      );

      date = addDays(date, 1);
    }

    return <div className="calendar-cells">{dates}</div>;
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;

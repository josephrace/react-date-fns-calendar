import React from 'react';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format as formatDate,
  isSameDay,
  isSameMonth,
  isToday,
  startOfWeek,
  startOfMonth,
  subMonths,
} from 'date-fns';
import './Calendar.css';

type Event = {
  date: Date;
  name: string;
};

type Props = {
  events: Event[];
  options: {
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  };
};

type State = {
  currentMonth: Date;
  selectedDate: Date;
};

class Calendar extends React.Component<Props, State> {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
  };

  handleSelectDate = (date: Date) => {
    this.setState({
      selectedDate: date,
    });
  };

  handleSelectMonth = (date: Date) => {
    this.setState({
      currentMonth: date,
    });
  };

  handlePrevMonth = () => {
    this.setState(state => ({
      currentMonth: subMonths(state.currentMonth, 1),
    }));
  };

  handleNextMonth = () => {
    this.setState(state => ({
      currentMonth: addMonths(state.currentMonth, 1),
    }));
  };

  renderHeader() {
    return (
      <div className="calendar-header">
        <div className="calendar-prev" onClick={this.handlePrevMonth}>
          &lt; Previous
        </div>
        <div className="calendar-current" onClick={() => this.handleSelectMonth(new Date())}>
          {formatDate(this.state.currentMonth, 'MMMM yyyy')}
        </div>
        <div className="calendar-next" onClick={this.handleNextMonth}>
          Next &gt;
        </div>
      </div>
    );
  }

  renderDays() {
    const { options } = this.props;
    const weekStart = startOfWeek(this.state.currentMonth, {
      weekStartsOn: options.weekStartsOn,
    });
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-day" key={i}>
          {formatDate(addDays(weekStart, i), 'EEEE')}
        </div>
      );
    }

    return <div className="calendar-days">{days}</div>;
  }

  renderCells() {
    const { options } = this.props;
    const monthStart = startOfMonth(this.state.currentMonth);
    const monthEnd = endOfMonth(this.state.currentMonth);
    const dateStart = startOfWeek(monthStart, {
      weekStartsOn: options.weekStartsOn,
    });
    const dateEnd = endOfWeek(monthEnd, {
      weekStartsOn: options.weekStartsOn,
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
          key={formatDate(date, 'T')}
          onClick={() =>
            isSameMonth(thisDate, this.state.currentMonth) && this.handleSelectDate(thisDate)
          }
        >
          <div className="calendar-cell__date">{formatDate(date, 'd')}</div>
          {this.props.events.map(event => {
            if (isSameDay(date, event.date)) {
              return (
                <div
                  key={`${event.name}-${formatDate(event.date, 'T')}`}
                  className="calendar-event"
                >
                  {event.name}
                </div>
              );
            }

            return null;
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

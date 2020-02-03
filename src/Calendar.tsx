import React, { useState } from 'react';
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

const Calendar: React.FunctionComponent<Props> = props => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <div className="calendar-prev" onClick={handlePrevMonth}>
          &lt; Previous
        </div>
        <div className="calendar-current" onClick={() => setCurrentMonth(new Date())}>
          {formatDate(currentMonth, 'MMMM yyyy')}
        </div>
        <div className="calendar-next" onClick={handleNextMonth}>
          Next &gt;
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const { options } = props;
    const weekStart = startOfWeek(currentMonth, {
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
  };

  const renderCells = () => {
    const { options } = props;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
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

      if (isSameDay(date, selectedDate)) {
        classes += ' calendar-cell--selected';
      }

      if (isToday(date)) {
        classes += ' calendar-cell--today';
      }

      if (!isSameMonth(date, currentMonth)) {
        classes += ' calendar-cell--disabled';
      }

      dates.push(
        <div
          className={classes}
          key={formatDate(date, 'T')}
          onClick={() => isSameMonth(thisDate, currentMonth) && setSelectedDate(thisDate)}
        >
          <div className="calendar-cell__date">{formatDate(date, 'd')}</div>
          {props.events.map(event => {
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
  };

  return (
    <div>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;

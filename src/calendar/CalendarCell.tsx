import React from 'react';
import { isSameDay, isSameMonth, isToday, format } from 'date-fns';
import { CalendarEvent } from './Calendar';

type Props = {
  date: Date;
  events: CalendarEvent[];
  currentMonth: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const CalendarCell: React.FunctionComponent<Props> = ({
  date,
  events,
  currentMonth,
  selectedDate,
  setSelectedDate,
}) => {
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

  return (
    <div
      className={classes}
      onClick={() => isSameMonth(thisDate, currentMonth) && setSelectedDate(thisDate)}
      data-testid="calendar-cell"
    >
      <div className="calendar-cell__date">{format(date, 'd')}</div>
      {events.map(event => {
        if (isSameDay(date, event.date)) {
          return (
            <div key={`${event.name}-${format(event.date, 'T')}`} className="calendar-event">
              {event.name}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default CalendarCell;

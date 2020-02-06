import React from 'react';
import { isSameDay, isSameMonth, isToday, format } from 'date-fns';
import { useCalendar } from './CalendarContext';
import CalendarEvent from './CalendarEvent';

type Props = {
  date: Date;
};

const CalendarCell: React.FunctionComponent<Props> = ({ date }) => {
  const { events, currentMonth, selectedDate, setSelectedDate } = useCalendar();

  if (!currentMonth || !setSelectedDate) return null;

  const thisDate = date;

  let classes = 'calendar-cell';

  if (selectedDate && isSameDay(date, selectedDate)) {
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
      {events &&
        events
          .filter(event => isSameDay(date, event.date))
          .map(event => (
            <CalendarEvent key={`${event.name}-${format(event.date, 'T')}`} event={event} />
          ))}
    </div>
  );
};

export default CalendarCell;

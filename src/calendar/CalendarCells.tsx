import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';
import CalendarCell from './CalendarCell';
import { CalendarEvent, CalendarWeekStartsOn } from './Calendar';

type Props = {
  currentMonth: Date;
  events: CalendarEvent[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  weekStartsOn: CalendarWeekStartsOn;
};

const CalendarCells: React.FunctionComponent<Props> = ({
  currentMonth,
  events,
  selectedDate,
  setSelectedDate,
  weekStartsOn,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const dateStart = startOfWeek(monthStart, {
    weekStartsOn: weekStartsOn,
  });
  const dateEnd = endOfWeek(monthEnd, {
    weekStartsOn: weekStartsOn,
  });
  const dates = [];

  let date = dateStart;

  while (date <= dateEnd) {
    dates.push(
      <CalendarCell
        key={format(date, 'T')}
        date={date}
        events={events}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    );

    date = addDays(date, 1);
  }

  return <div className="calendar-cells">{dates}</div>;
};

export default CalendarCells;

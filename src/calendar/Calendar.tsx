import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarCells from './CalendarCells';
import './calendar.css';

export type CalendarEvent = {
  date: Date;
  name: string;
};

export type CalendarWeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CalendarProps = {
  events: CalendarEvent[];
  weekStartsOn?: CalendarWeekStartsOn;
};

const Calendar: React.FunctionComponent<CalendarProps> = ({ events, weekStartsOn = 1 }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <>
      <CalendarHeader
        handleNextMonth={handleNextMonth}
        handlePrevMonth={handlePrevMonth}
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <CalendarDays currentMonth={currentMonth} weekStartsOn={weekStartsOn} />
      <CalendarCells
        currentMonth={currentMonth}
        events={events}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        weekStartsOn={weekStartsOn}
      />
    </>
  );
};

export default Calendar;

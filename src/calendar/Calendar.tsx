import React from 'react';
import { CalendarProvider } from './CalendarContext';
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

const Calendar: React.FunctionComponent<CalendarProps> = ({ events, weekStartsOn = 1 }) => (
  <CalendarProvider events={events} weekStartsOn={weekStartsOn}>
    <CalendarHeader />
    <CalendarDays />
    <CalendarCells />
  </CalendarProvider>
);

export default Calendar;

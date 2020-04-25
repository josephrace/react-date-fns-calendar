import React, { useContext, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { CalendarEvent, CalendarWeekStartsOn } from './Calendar';

type CalendarContext = {
  events: CalendarEvent[];
  weekStartsOn: CalendarWeekStartsOn;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  prevMonth: () => void;
  nextMonth: () => void;
};

const CalendarContext = React.createContext<Partial<CalendarContext>>({});

export const useCalendar = () => useContext(CalendarContext);

type CalendarProviderProps = {
  children: React.ReactNode;
  events: CalendarEvent[];
  weekStartsOn: CalendarWeekStartsOn;
};

export const CalendarProvider: React.FunctionComponent<CalendarProviderProps> = ({
  children,
  events,
  weekStartsOn,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>();
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <CalendarContext.Provider
      value={{
        events,
        weekStartsOn,
        currentMonth,
        setCurrentMonth,
        selectedDate,
        setSelectedDate,
        prevMonth,
        nextMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

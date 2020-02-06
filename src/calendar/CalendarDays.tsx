import React from 'react';
import { startOfWeek, format, addDays } from 'date-fns';
import { CalendarWeekStartsOn } from './Calendar';

type Props = {
  currentMonth: Date;
  weekStartsOn: CalendarWeekStartsOn;
};

const CalendarDays: React.FunctionComponent<Props> = ({ currentMonth, weekStartsOn }) => {
  const weekStart = startOfWeek(currentMonth, {
    weekStartsOn,
  });
  const days = [];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div key={i} className="calendar-day" data-testid="calendar-day">
        {format(addDays(weekStart, i), 'EEEE')}
      </div>
    );
  }

  return <div className="calendar-days">{days}</div>;
};

export default CalendarDays;

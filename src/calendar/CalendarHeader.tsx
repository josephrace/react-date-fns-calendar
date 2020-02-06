import React from 'react';
import { format } from 'date-fns';
import { useCalendar } from './CalendarContext';

const CalendarHeader: React.FunctionComponent = () => {
  const { currentMonth, setCurrentMonth, nextMonth, prevMonth } = useCalendar();

  if (!currentMonth || !setCurrentMonth) return null;

  return (
    <div className="calendar-header">
      <div className="calendar-prev" onClick={prevMonth} data-testid="calendar-header-prev">
        &lt; Previous
      </div>
      <div
        className="calendar-current"
        onClick={() => setCurrentMonth(new Date())}
        data-testid="calendar-header-current"
      >
        {format(currentMonth, 'MMMM yyyy')}
      </div>
      <div className="calendar-next" onClick={nextMonth} data-testid="calendar-header-next">
        Next &gt;
      </div>
    </div>
  );
};

export default CalendarHeader;

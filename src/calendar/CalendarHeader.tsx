import React from 'react';
import { format } from 'date-fns';

type Props = {
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
};

const CalendarHeader: React.FunctionComponent<Props> = ({
  handleNextMonth,
  handlePrevMonth,
  currentMonth,
  setCurrentMonth,
}) => (
  <div className="calendar-header">
    <div className="calendar-prev" onClick={handlePrevMonth} data-testid="calendar-header-prev">
      &lt; Previous
    </div>
    <div
      className="calendar-current"
      onClick={() => setCurrentMonth(new Date())}
      data-testid="calendar-header-current"
    >
      {format(currentMonth, 'MMMM yyyy')}
    </div>
    <div className="calendar-next" onClick={handleNextMonth} data-testid="calendar-header-next">
      Next &gt;
    </div>
  </div>
);

export default CalendarHeader;

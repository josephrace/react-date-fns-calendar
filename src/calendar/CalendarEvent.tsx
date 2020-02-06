import React from 'react';
import { CalendarEvent as CalendarEventType } from './Calendar';

type Props = {
  event: CalendarEventType;
};

const CalendarEvent: React.FunctionComponent<Props> = ({ event }) => (
  <div className="calendar-event">{event.name}</div>
);

export default CalendarEvent;

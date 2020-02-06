import React from 'react';
import Calendar from './calendar/Calendar';
import { addDays, subDays } from 'date-fns';

function App() {
  const events = [
    { date: subDays(new Date(), 5), name: 'Event in the past' },
    { date: addDays(new Date(), 1), name: 'Foo' },
    { date: addDays(new Date(), 1), name: 'Wow calendar' },
  ];

  return <Calendar events={events} />;
}

export default App;

import React from 'react';
import { addDays } from 'date-fns';
import { render } from '@testing-library/react';
import Calendar from './Calendar';

it('renders without crashing', () => {
  render(
    <Calendar
      events={[
        {
          date: addDays(new Date(), 1),
          name: 'Foo',
        },
        {
          date: addDays(new Date(), 2),
          name: 'Bar',
        },
      ]}
      options={{ weekStartsOn: 1 }}
    />
  );
});

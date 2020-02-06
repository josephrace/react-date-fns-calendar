import React from 'react';
import { addDays, format, addMonths, subMonths, getDaysInMonth, getDate } from 'date-fns';
import { render } from '@testing-library/react';
import Calendar, { CalendarProps } from './Calendar';

const getProps = (overrides: Partial<CalendarProps> = {}): CalendarProps => ({
  events: [
    {
      date: addDays(new Date(), 1),
      name: 'Foo',
    },
    {
      date: addDays(new Date(), 2),
      name: 'Bar',
    },
  ],
  ...overrides,
});

describe('Calendar', () => {
  it('renders without crashing', () => {
    const props = getProps();

    render(<Calendar {...props} />);
  });

  describe('the header', () => {
    it('shows the current month and year in the header', () => {
      const currentMonthAndYear = format(new Date(), 'MMMM yyyy');
      const props = getProps();
      const { getByTestId } = render(<Calendar {...props} />);

      expect(getByTestId('calendar-header-current').textContent).toEqual(currentMonthAndYear);
    });

    it('adds a month when clicking next', () => {
      const nextMonthAndYear = format(addMonths(new Date(), 1), 'MMMM yyyy');
      const props = getProps();
      const { getByTestId } = render(<Calendar {...props} />);

      getByTestId('calendar-header-next').click();
      expect(getByTestId('calendar-header-current').textContent).toEqual(nextMonthAndYear);
    });

    it('subs a month when clicking prev', () => {
      const prevMonthAndYear = format(subMonths(new Date(), 1), 'MMMM yyyy');
      const props = getProps();
      const { getByTestId } = render(<Calendar {...props} />);

      getByTestId('calendar-header-prev').click();
      expect(getByTestId('calendar-header-current').textContent).toEqual(prevMonthAndYear);
    });
  });

  describe('the days', () => {
    it('starts the week on Monday by default', () => {
      const props = getProps();
      const { getAllByTestId } = render(<Calendar {...props} />);

      expect(getAllByTestId('calendar-day')[0].textContent).toEqual('Monday');
    });

    it('allows a different week start day', () => {
      const props = getProps({ weekStartsOn: 0 });
      const { getAllByTestId } = render(<Calendar {...props} />);

      expect(getAllByTestId('calendar-day')[0].textContent).toEqual('Sunday');
    });
  });

  describe('the cells', () => {
    it('displays the correct number of cells', () => {
      const daysInMonth = getDaysInMonth(new Date());
      const props = getProps();
      const { getAllByTestId } = render(<Calendar {...props} />);

      expect(
        getAllByTestId('calendar-cell').filter(
          cell => !cell.classList.contains('calendar-cell--disabled')
        )
      ).toHaveLength(daysInMonth);
    });

    it('highlights the cell for current day', () => {
      const today = getDate(new Date());
      const props = getProps();
      const { getAllByTestId } = render(<Calendar {...props} />);

      expect(
        getAllByTestId('calendar-cell').find(cell => cell.textContent?.includes(`${today}`))
          ?.classList
      ).toContain('calendar-cell--today');
    });

    it('highlights the selected day after clicking', () => {
      const props = getProps();
      const { getAllByTestId } = render(<Calendar {...props} />);
      const activeCells = getAllByTestId('calendar-cell').filter(
        cell => !cell.classList.contains('calendar-cell--disabled')
      );

      expect(activeCells[1].classList.contains('calendar-cell--selected')).toBe(false);

      activeCells[1].click();

      expect(activeCells[1].classList.contains('calendar-cell--selected')).toBe(true);

      activeCells[2].click();

      expect(activeCells[1].classList.contains('calendar-cell--selected')).toBe(false);
      expect(activeCells[2].classList.contains('calendar-cell--selected')).toBe(true);
    });
  });
});

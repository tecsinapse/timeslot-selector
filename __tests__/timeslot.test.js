import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestComponent } from './TestComponent';

test('Render Timeslot', () => {
  const { getByText, container } = render(<TestComponent />);

  expect(container).toContainElement(getByText('Consultor e duração'));
  expect(container).toContainElement(getByText('30 minutos'));
});

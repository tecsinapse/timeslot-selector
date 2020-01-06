import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TestComponent } from './TestComponent';
// TODO: Fix TypeError: Cannot set property 'font' of null error when running
test('Render Timeslot', () => {
  const { getByText, container } = render(<TestComponent />);

  expect(container).toContainElement(getByText('Consultor e duração'));
  expect(container).toContainElement(getByText('30 minutos'));
});

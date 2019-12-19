/* eslint-disable no-console */
/* eslint-disable no-alert */
import { ThemeProvider } from '@tecsinapse/ui-kit';
import React from 'react';
import { availabilities as personsAvailabilities } from '../src/TimeslotSelector/availabilities';
import { TimeslotSelector } from '../src/TimeslotSelector';

export const personsEmailSelected = personsAvailabilities.map(p => p.email);

export const selectedEmailPerson = 'ricardo.almeida@example.com.br';
export const selectedDate = '2019-02-12';
export const selectedTime = '08:00';

export const onHandleScheduleTest = selected => {
  alert(
    `Usuário: ${selected.email}\nData: ${selected.date}\nHora: ${selected.time}\n`
  );
};

export const style = {
  border: 'solid gray 1px',
  height: '100%',
};

export const TestComponent = () => (
  <ThemeProvider variant="orange">
    <TimeslotSelector
      style={style}
      classes={{
        root: {
          minWidth: 576,
          width: '100%',
          height: 'calc(100% - 8px)',
          minHeight: '450px',
          position: 'relative',
        },
      }}
      font="Arial"
      personsAvailabilities={personsAvailabilities}
      selectedEmailPerson={selectedEmailPerson}
      durations={[15, 20, 30]}
      defaultDuration="20"
      onWeekChange={obj => console.log(obj)}
      onHandleSchedule={onHandleScheduleTest}
      personsEmailSelected={personsEmailSelected}
      selectedTime={selectedTime}
      selectedDate={selectedDate}
    />
  </ThemeProvider>
);

export default TestComponent;

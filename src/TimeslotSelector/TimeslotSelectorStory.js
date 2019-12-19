/* eslint-disable no-console */
/* eslint-disable no-alert */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Button, Input } from '@tecsinapse/ui-kit';
import { TimeslotSelector } from './TimeslotSelector';
import { availabilities as personsAvailabilities } from './availabilities';

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

export const handleChange = (event, changeOtherProps) =>
  changeOtherProps ? changeOtherProps('empresa', event.target.value) : () => {};

export const customStep = [
  {
    label: 'Empresas',
    component: ({ key, callNextStep, changeOtherProps, otherProps }) => (
      <div key={key}>
        <Typography variant="h4">Empresas</Typography>
        <Input
          label="Empresa"
          value={otherProps.empresa}
          fullWidth
          onChange={event => handleChange(event, changeOtherProps)}
          name="a"
        />
        <Divider style={{ margin: 8 }} />
        <Button onClick={callNextStep} variant="secondary">
          Próximo
        </Button>
      </div>
    ),
  },
];

export const TimeslotSelectorStory = ({ ...props }) => (
  <TimeslotSelector {...props} />
);

/* eslint-disable react/jsx-curly-newline */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Chip,
  Divider,
  Grid,
  Typography,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import { DateTime } from 'luxon';

import { WeeklyCalendar } from '@tecsinapse/pickers';
import { Card, Button, IconButton } from '@tecsinapse/ui-kit';

const generateTimeSlots = (personAvailabilities, date, duration) => {
  const dateTimeSlots = personAvailabilities.availabilities
    .filter(av => av.date === date.toFormat('yyyy-MM-dd'))
    .map(av => av.timeSlot);
  const timeSlots = [];
  if (!dateTimeSlots.length) {
    return [];
  }

  dateTimeSlots[0].forEach(dateTs => {
    let timeSlot = DateTime.fromISO(dateTs.start);
    const endTime = DateTime.fromISO(dateTs.end);
    const slotDuration = duration % 15 === 0 ? 15 : duration;
    while (timeSlot < endTime) {
      if (timeSlot.plus({ minutes: duration }) <= endTime) {
        timeSlots.push(
          timeSlot.toLocaleString({
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
        );
      }
      timeSlot = timeSlot.plus({ minutes: slotDuration });
    }
  });
  return timeSlots;
};

const mapByPerson = (personsAvailabilities, date, duration) => {
  const map = [];
  personsAvailabilities.forEach(pa => {
    map[pa.email] = {
      name: pa.name,
      email: pa.email,
      timeSlots: generateTimeSlots(pa, date, duration),
    };
  });

  return map;
};

export const Step2 = ({
  classes,
  personsAvailabilities,
  selectedPeople,
  selectedDuration,
  onHandleSchedule,
  onWeekChange,
  labels,
  locale,
  callPreviousStep,
  callCancel,
  selectedDate,
  selectedTime,
  selectedPerson,
  mode,
  availableVehicles,
  otherProps,
}) => {
  const [defaultDate, setSelectedDate] = useState(
    selectedDate ? DateTime.fromISO(selectedDate) : DateTime.local()
  );
  const [statefulAvailableVehicles, setStatefulAvailableVehicles] = useState(
    availableVehicles
  );
  const [selectedPeopleTimeSlot, setSelectedPeopleTimeSlot] = useState(
    mode === 'SINGLE'
      ? null
      : {
          schedulings: [],
          otherProps,
        }
  );
  const [currentVehicleId, setCurrentVehicleId] = useState(
    mode === 'SINGLE'
      ? null
      : availableVehicles[0]
      ? availableVehicles[0].uniqueId
      : null
  );

  const timeSlotsByPerson = mapByPerson(
    personsAvailabilities,
    defaultDate,
    selectedDuration
  );
  if (
    mode === 'SINGLE' &&
    selectedPeople &&
    selectedPerson &&
    selectedDate &&
    selectedDate === defaultDate.toISODate() &&
    selectedTime
  ) {
    const person = timeSlotsByPerson[selectedPerson];
    if (person) {
      const timeSlot = person.timeSlots;
      const personTime = timeSlot.find(tm => tm === selectedTime);
      if (personTime && !selectedPeopleTimeSlot) {
        setSelectedPeopleTimeSlot({
          date: defaultDate.toISODate(),
          time: personTime,
          email: person.email,
          duration: selectedDuration,
          otherProps,
        });
      }
    }
  }

  const findScheduledVehicle = uniqueId =>
    selectedPeopleTimeSlot.schedulings.find(
      scheduled => scheduled.uniqueId === uniqueId
    );
  const isChipSelected = (ts, email) => {
    if (mode === 'SINGLE') {
      return (
        selectedPeopleTimeSlot &&
        selectedPeopleTimeSlot.time === ts &&
        selectedPeopleTimeSlot.email === email
      );
    }
    return !!selectedPeopleTimeSlot.schedulings.find(
      scheduled =>
        scheduled.date === defaultDate.toISODate() &&
        scheduled.time === ts &&
        scheduled.email === email
    );
  };

  const handleClickRemove = uniqueId => {
    if (currentVehicleId === uniqueId) {
      setCurrentVehicleId(null);
    }
    setStatefulAvailableVehicles(
      statefulAvailableVehicles.filter(vehicle => vehicle.uniqueId !== uniqueId)
    );
    setSelectedPeopleTimeSlot({
      ...selectedPeopleTimeSlot,
      schedulings: selectedPeopleTimeSlot.schedulings.filter(
        scheduled => scheduled.uniqueId !== uniqueId
      ),
    });
  };

  const handleClickTimeChip = (ts, person) => {
    if (!currentVehicleId) {
      return;
    }
    if (mode === 'SINGLE') {
      setSelectedPeopleTimeSlot({
        date: defaultDate.toISODate(),
        time: ts,
        email: person.email,
        duration: selectedDuration,
        otherProps,
      });
    } else {
      const filtered = selectedPeopleTimeSlot.schedulings.filter(
        scheduled => scheduled.uniqueId !== currentVehicleId
      );
      filtered.push({
        uniqueId: currentVehicleId,
        date: defaultDate.toISODate(),
        time: ts,
        email: person.email,
        duration: selectedDuration,
      });
      setSelectedPeopleTimeSlot({
        ...selectedPeopleTimeSlot,
        schedulings: filtered,
      });
    }
  };

  const handleDayChange = day => {
    setSelectedDate(day);
    if (mode === 'SINGLE') {
      setSelectedPeopleTimeSlot(null);
    }
  };
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <div>
        <Grid justify="center" container spacing={0}>
          <Grid item>
            <WeeklyCalendar
              currentDate={defaultDate}
              onDayChange={handleDayChange}
              onWeekChange={onWeekChange}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.stepContent}>
        <div className={classes.stepContentScrolling}>
          {mode === 'MULTI' && (
            <div className={classes.vehicleCards}>
              <Typography variant="h6">
                Clique no veículo desejado abaixo e então escolha o horário ao
                lado.
              </Typography>
              {statefulAvailableVehicles.map(vehicle => {
                const scheduledVehicle = findScheduledVehicle(vehicle.uniqueId);
                return (
                  <Card
                    key={vehicle.uniqueId}
                    className={[
                      classes.vehicleCardRoot,
                      currentVehicleId === vehicle.uniqueId
                        ? classes.vehicleCardRootSelected
                        : '',
                    ].join(' ')}
                    onClick={() => setCurrentVehicleId(vehicle.uniqueId)}
                  >
                    <CardHeader
                      title={
                        <span>
                          {vehicle.description}{' '}
                          {scheduledVehicle ? (
                            <small className={classes.timeSelectedBullet}>
                              {bull}
                              {' Horário selecionado'}
                            </small>
                          ) : (
                            ''
                          )}
                        </span>
                      }
                      action={
                        <IconButton
                          onClick={e => {
                            e.stopPropagation();
                            handleClickRemove(vehicle.uniqueId);
                          }}
                        >
                          {/* <CloseIcon/> */}
                        </IconButton>
                      }
                      subheader={
                        scheduledVehicle
                          ? `${DateTime.fromISO(scheduledVehicle.date)
                              .setLocale(locale)
                              .toLocaleString(DateTime.DATE_SHORT)} ${
                              scheduledVehicle.time
                            }`
                          : ''
                      }
                    ></CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
          <Grid item container direction="column" spacing={2}>
            {selectedPeople.map(key => {
              const person = timeSlotsByPerson[key];
              return (
                <Grid item key={person.email}>
                  <Card>
                    <CardContent className={classes.availabilityCardRoot}>
                      <Typography variant="body1" color="textSecondary">
                        <b>{person.name}</b> {bull}{' '}
                        {defaultDate
                          .setLocale(locale)
                          .toLocaleString(DateTime.DATE_HUGE)}
                      </Typography>
                      {person.timeSlots.length ? (
                        person.timeSlots.map(ts =>
                          isChipSelected(ts, person.email) ? (
                            <Chip
                              key={ts}
                              className={classes.availabilityCardTime}
                              label={ts}
                              color="secondary"
                            />
                          ) : (
                            <Chip
                              key={ts}
                              className={classes.availabilityCardTime}
                              label={ts}
                              clickable={mode === 'SINGLE' || currentVehicleId}
                              disabled={mode !== 'SINGLE' && !currentVehicleId}
                              onClick={() => handleClickTimeChip(ts, person)}
                            />
                          )
                        )
                      ) : (
                        <Typography variant="body1" color="textSecondary">
                          {labels.noTimeSlotAvailable}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
      <div className={classes.stepButtons}>
        <Grid container alignContent="flex-end" justify="center" spacing={2}>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
          {callCancel && (
            <Grid item>
              <Button
                customVariant="error"
                onClick={callCancel}
                variant="contained"
              >
                {labels.buttonLabelCancel}
              </Button>
            </Grid>
          )}
          {callPreviousStep && (
            <Grid item>
              <Button
                onClick={callPreviousStep}
                customVariant="warning"
                variant="contained"
              >
                {labels.buttonLabelprevious}
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              customVariant="success"
              variant="contained"
              disabled={selectedPeopleTimeSlot == null}
              onClick={() =>
                onHandleSchedule && onHandleSchedule(selectedPeopleTimeSlot)
              }
            >
              {labels.buttonLabelSchedule}
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Step2.defaultProps = {
  onWeekChange: {},
  callCancel: undefined,
  otherProps: undefined,
  selectedDate: '',
  selectedTime: '',
  selectedPerson: '',
  mode: 'SINGLE',
  availableVehicles: [],
};

Step2.propTypes = {
  labels: PropTypes.object.isRequired,
  onHandleSchedule: PropTypes.func.isRequired,
  onWeekChange: PropTypes.func,
  callPreviousStep: PropTypes.func.isRequired,
  callCancel: PropTypes.func,
  selectedDate: PropTypes.string,
  selectedTime: PropTypes.string,
  selectedPerson: PropTypes.string,
  otherProps: PropTypes.object,
  mode: PropTypes.oneOf(['SINGLE', 'MULTI']),
  availableVehicles: PropTypes.arrayOf(
    PropTypes.shape({
      uniqueId: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

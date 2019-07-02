import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';

import clsx from 'clsx';
import isSameDay from 'date-fns/isSameDay';
import formatDate from 'date-fns/format';
import PropTypes from 'prop-types';
import {
  KeyboardDatePicker,
  DatePicker as DatePickerExt,
} from '@material-ui/pickers';

const useStyle = makeStyles(theme => ({
  dayWrapper: {
    position: 'relative',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: '0 2px',
    color: 'inherit',
  },
  customDayHighlight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '2px',
    right: '2px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '50%',
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled,
  },
  highlightNonCurrentMonthDay: {
    color: '#676767',
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  badge: {
    position: 'absolute',
    marginTop: '30%',
  },
  badgeNonCurrentMonth: {
    backgroundColor: theme.palette.text.disabled,
  },
}));

export const DatePicker = ({
  selectedDate,
  id,
  label,
  onChange,
  format,
  variant,
  pointedDates,
  ...props
}) => {
  const classes = useStyle();

  const renderPointedDay = (date, selectedDateRender, dayInCurrentMonth) => {
    const isPointed =
      pointedDates.find(pointDate => isSameDay(pointDate, date)) !== undefined;
    const isSelected = isSameDay(date, selectedDateRender);

    const dayClassName = clsx(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlight]: isSelected,
    });

    return (
      <div>
        <IconButton className={dayClassName}>
          <span> {formatDate(date, 'd')} </span>
          {isPointed && (
            <Badge
              color="primary"
              className={classes.badge}
              variant="dot"
              classes={
                !dayInCurrentMonth
                  ? { colorPrimary: classes.badgeNonCurrentMonth }
                  : undefined
              }
            />
          )}
        </IconButton>
      </div>
    );
  };

  return variant === 'keyboard' ? (
    <KeyboardDatePicker
      format={format}
      id={id}
      label={label}
      value={selectedDate}
      onChange={onChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      renderDay={pointedDates.length > 0 ? renderPointedDay : undefined}
      {...props}
    />
  ) : (
    <DatePickerExt
      format={format}
      id={id}
      label={label}
      value={selectedDate}
      onChange={onChange}
      renderDay={pointedDates.length > 0 ? renderPointedDay : undefined}
      {...props}
    />
  );
};

DatePicker.defaultProps = {
  label: 'Date Picker',
  id: 'datepicker-id',
  onChange: () => {},
  format: undefined,
  variant: '',
  pointedDates: [],
};

DatePicker.propTypes = {
  selectedDate: PropTypes.object.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  format: PropTypes.string,
  variant: PropTypes.oneOf(['keyboard']),
  pointedDates: PropTypes.arrayOf(Date),
};
export default DatePicker;

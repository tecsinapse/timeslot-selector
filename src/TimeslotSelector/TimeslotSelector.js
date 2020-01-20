import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Dialog, DialogContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import { timeslotSelectorStyles } from './timeslotSelectorStyles';
import TimeslotSelectorComponent from './TimeslotSelectorComponent';

export class TimeslotSelectorUnstyled extends React.Component {
  constructor(props) {
    super(props);
    const {
      openOpened,
      personsEmailSelected,
      defaultDuration,
      otherProps: otherPropsDefault,
    } = this.props;

    this.state = {
      dlgOpen: openOpened,
      selectedPeople: personsEmailSelected || [],
      selectedDuration: defaultDuration,
      otherProps: otherPropsDefault || {},
    };
    this.changeSelectedPeople = selectedPeople => {
      this.setState({ selectedPeople: [...selectedPeople] });
    };

    this.changeSelectedDuration = selectedDuration => {
      this.setState({ selectedDuration });
    };

    this.changeOtherProps = (name, value) => {
      const { otherProps } = this.state;
      otherProps[name] = value;
      this.setState({ otherProps: { ...otherProps } });
    };
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    const { personsEmailSelected: personsEmailSelectedPrev } = this.props;
    const { personsEmailSelected } = nextProps;
    if (personsEmailSelectedPrev !== personsEmailSelected) {
      this.setState({ selectedPeople: personsEmailSelected });
    }
  }

  render() {
    const {
      dialog,
      classes,
      labels,
      personsAvailabilities,
      durations,
      selectedEmailPerson,
    } = this.props;
    const {
      dlgOpen,
      selectedPeople,
      selectedDuration,
      otherProps,
    } = this.state;
    if (dialog) {
      return (
        <Dialog
          classes={{ paperScrollPaper: classes.paperScrollPaper }}
          maxWidth={false}
          fullWidth
          open={dlgOpen}
          disableEnforceFocus
          closeAfterTransition
        >
          <DialogContent>
            <TimeslotSelectorComponent
              {...this.props}
              classes={classes}
              setDlgOpen={value => this.setState({ dlgOpen: value })}
              selectedPeople={selectedPeople}
              selectedDuration={selectedDuration}
              otherProps={otherProps}
              setSelectedPeople={this.changeSelectedPeople}
              setSelectedDuration={this.changeSelectedDuration}
              changeOtherProps={this.changeOtherProps}
              labels={labels}
              personsAvailabilities={personsAvailabilities}
              selectedPerson={selectedEmailPerson}
            />
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <TimeslotSelectorComponent
        {...this.props}
        classes={classes}
        selectedPeople={selectedPeople}
        selectedDuration={selectedDuration}
        otherProps={otherProps}
        setSelectedPeople={this.changeSelectedPeople}
        setSelectedDuration={this.changeSelectedDuration}
        changeOtherProps={this.changeOtherProps}
        labels={labels}
        personsAvailabilities={personsAvailabilities}
        durations={durations}
        selectedPerson={selectedEmailPerson}
      />
    );
  }
}

TimeslotSelectorUnstyled.defaultProps = {
  labels: {
    step1Label: 'Consultor e duração',
    step2Label: 'Data e horário',
    minuteslabel: 'minutos',
    buttonLabelCancel: 'Cancelar',
    buttonLabelNext: 'Avançar',
    buttonLabelprevious: 'Voltar',
    buttonLabelSchedule: 'Agendar',
    noTimeSlotAvailable: 'Nenhum horário disponivel',
  },
  other: {},
  locale: 'pt-BR',
  defaultDuration: undefined,
  dialog: false,
  openOpened: false,
  onWeekChange: {},
  closeOnHandleSchedule: undefined,
  cancelDialog: undefined,
  beforeSteps: undefined,
  otherProps: undefined,
  selectedDate: '',
  selectedTime: '',
  personsEmailSelected: [],
  selectedEmailPerson: '',
};

TimeslotSelectorUnstyled.propTypes = {
  /** Component labels */
  labels: PropTypes.shape({
    step1Label: PropTypes.string,
    step2Label: PropTypes.string,
    minuteslabel: PropTypes.string,
    buttonLabelCancel: PropTypes.string,
    buttonLabelNext: PropTypes.string,
    buttonLabelprevious: PropTypes.string,
    buttonLabelSchedule: PropTypes.string,
    noTimeSlotAvailable: PropTypes.string,
  }),
  /** Object containing availabilities */
  personsAvailabilities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      availabilities: PropTypes.arrayOf(
        PropTypes.shape({
          date: PropTypes.string,
          timeSlot: PropTypes.arrayOf(
            PropTypes.shape({
              start: PropTypes.string,
              end: PropTypes.string,
            })
          ),
        })
      ),
    })
  ).isRequired,
  /** Array of selected emails */
  personsEmailSelected: PropTypes.arrayOf(PropTypes.string),
  /** Current selected person email */
  selectedEmailPerson: PropTypes.string,
  /** Language code locale for date render */
  locale: PropTypes.string,
  other: PropTypes.object,
  /** Availability durations time interval */
  durations: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** Default duration time */
  defaultDuration: PropTypes.string,
  /** Dialog mode */
  dialog: PropTypes.bool,
  /** Set if dialog is open */
  openOpened: PropTypes.bool,
  /** Schedule handler function */
  onHandleSchedule: PropTypes.func.isRequired,
  /** Function to cancel dialog */
  cancelDialog: PropTypes.func,
  /** Week change event handler */
  onWeekChange: PropTypes.func,
  /** Function to close dialog when scheduling */
  closeOnHandleSchedule: PropTypes.func,
  /** Props being propagated to children */
  otherProps: PropTypes.object,
  /** Current selected date */
  selectedDate: PropTypes.string,
  /** Current selected time */
  selectedTime: PropTypes.string,
  /** Put a step before scheduler (check custom steps story) */
  beforeSteps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
    })
  ),
};

export default TimeslotSelectorUnstyled;

export const TimeslotSelector = withStyles(timeslotSelectorStyles)(
  TimeslotSelectorUnstyled
);

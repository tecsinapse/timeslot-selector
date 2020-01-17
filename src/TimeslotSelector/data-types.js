import PropTypes from 'prop-types';

const Company = {};

Company.propTypes = {
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export const Person = {};

Person.propTypes = {
  code: PropTypes.string.isRequired,
  companyCode: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export const TimeslotData = {};

TimeslotData.propTypes = {
  companies: PropTypes.arrayOf(Company),
  persons: PropTypes.arrayOf(Person),
  slotDurations: PropTypes.arrayOf(PropTypes.number),
  selectedPerson: PropTypes.objectOf(Person),
  selectedDate: PropTypes.object,
  selectedTime: PropTypes.object,
  selectedSlotDuration: PropTypes.number,
  otherData: PropTypes.object,
};

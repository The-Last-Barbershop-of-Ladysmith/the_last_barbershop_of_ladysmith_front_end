const nameIsValid = (name) => {
  const isNotEmpty = name.trim().length > 0;
  const containsLettersAndDashesOnly = name.match(/[A-Za-z0-9\-\_]+/);
  return isNotEmpty && containsLettersAndDashesOnly;
};

const mobileNumberIsValid = (mobile_number) => {
  const isNotEmpty = mobile_number.trim().length > 0;
  const isCorrectFormat = mobile_number.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
  return isNotEmpty && isCorrectFormat;
};

const peopleIsValid = (people) => {
  return people > 0;
};

const dateIsValid = (appointmentDate) => {
    return appointmentDate > new Date()
}

const timeIsValid = (appointmentTime) => {
    const isNotEmpty = appointmentTime.trim().length > 0
    const isCorrectFormat = appointmentTime.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    return isNotEmpty && isCorrectFormat
}

const getInvalidInfoFormFields = ({ first_name, last_name, mobile_number, people }) => {
  const errorFields = []
  const validFields = {
    first_name: nameIsValid(first_name),
    last_name: nameIsValid(last_name),
    mobile_number: mobileNumberIsValid(mobile_number),
    people: peopleIsValid(people),
  };
  Object.keys(validFields).forEach((field) => {
    if (!validFields[field]) errorFields.push(field);
  });
  return errorFields
};

const getInvalidDateTimeFields = ({appointment_date, appointment_time}) =>{
  const errorFields = []
    if (!dateIsValid(appointment_date)) errorFields.push('appointment_date')
    if (!timeIsValid(appointment_time)) errorFields.push('appointment-time')
    return errorFields
}

module.exports = {
  getInvalidInfoFormFields, getInvalidDateTimeFields
}
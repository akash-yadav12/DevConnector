const Validator = require('validator')
const isEmpty = require('./is-empty');


module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';


  if(Validator.isEmpty(data.school)){
    errors.school = 'School field is required'
  }

  if(Validator.isEmpty(data.degree)){
    errors.degree = 'degree Field is required'
  }

  if(Validator.isEmpty(data.fieldofstudy)){
    errors.fieldofstudy = 'field of study Field is required'
  }

  if(Validator.isEmpty(data.from)){
    errors.from = 'From field is required'
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
} 
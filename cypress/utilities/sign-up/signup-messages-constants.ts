// SIGN-UP INLINE ERROR MESSAGES
export const FIRST_LAST_NAME_ERROR_MSG1 =
  'Please enter your first and last name.'
export const FIRST_LAST_NAME_ERROR_MSG2 = 'First Name and Last Name is invalid'
export const EMAIL_ERROR_MSG = 'Please enter a valid email address.'
export const MOBILE_NUMBER_ERROR_MSG1 = 'Please enter a valid phone number'
export const MOBILE_NUMBER_ERROR_MSG2 =
  'Phone number is not valid. Include +CountryDialingCode for non-US numbers.'
export const BUSINESS_NAME_ERROR_MSG = 'Business name is required'
export const EMPLOYEE_DROPDOWN_ERROR_MSG = 'This field is required.'
export const PASSWORD_ERROR_MSG1 = 'Password is required.'
export const PASSWORD_ERROR_MSG2 = 'Please choose a password with at least 8 characters.'

// SIGN-UP INLINE INFO MESSAGES
export const MOBILE_NUMBER_INFO_MSG = "We'll text you a link to install our app"
export const PASSWORD_INFO_MSG = 'Minimum 8 characters and one numeric'

// SIGN-UP CONSTANT VARIABLES
export const INIT_NAME = 'WY User'
export const NEW_SIGNUP_EMAIL = `new.user2.${Math.floor(Math.random() * 900) + 100}${Cypress.env('STAGING_APP_ENV')}@workyard.testinator.com`
export const MOBILE_NUMBER_SIGNUP = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`
export const BUSINESS_NAME_SIGNUP = `Workyard System Tests Sign-Up Business V${Math.floor(Math.random() * 900) + 100}`
export const DEFAULT_PASSWORD = 'wytest1234'

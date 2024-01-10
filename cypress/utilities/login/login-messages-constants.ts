// LOGIN INLINE ERROR MESSAGES
export const LOGIN_EMAIL_ERROR_MSG1 = 'Email is required'
export const LOGIN_EMAIL_ERROR_MSG2 = 'Email is not valid'
export const LOGIN_PASSWORD_ERROR_MSG1 = 'Password is required'
export const LOGIN_PASSWORD_ERROR_MSG2 =
  'The password must be between 8 and 64 characters.'
export const LOGIN_NO_INTERNET_ERROR_MSG =
  "Login failed - could not connect to Workyard's authentication server"
export const LOGIN_WRONG_USERNAME_OR_PASSWORD_MSG =
  'Login failed - the email address or password was incorrect'

// LOGIN CONSTANT VARIABLES
export const DEFAULT_PASSWORD = 'wytest1234'
export const INIT_NAME = 'WY User'
export const UNKNOWN_USER_EMAIL = 'unknown.user@workyard.testinator.com'
export const NEW_SIGNUP_EMAIL_1 = `new.user1.${Math.floor(Math.random() * 900) + 100}${Cypress.env('appEnv')}@workyard.testinator.com`
export const NEW_SIGNUP_EMAIL_2 = `new.user2.${Math.floor(Math.random() * 900) + 100}${Cypress.env('appEnv')}@workyard.testinator.com`
export const BUSINESS_NAME_LOGIN = `Workyard System Tests Sign-Up Business V${Math.floor(Math.random() * 900) + 100}`
export const MOBILE_NUMBER_LOGIN = `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`

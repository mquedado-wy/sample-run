// FORGOT PASSWORD INFO/ERROR MESSAGES
export const FORGOT_PASSWD_SUCCESS_MSG =
  'A reset password link has been sent to your email'
export const FORGOT_PASSWD_NO_ACCOUNT_MSG =
  'No account with this email has been found'
export const FORGOT_PASSWD_NO_INPUT_MSG = 'This field is required'
export const FORGOT_PASSWD_INVALID_MSG = 'Email is not valid.'
export const FORGOT_PASSWD_PENDING_MSG =
  'This account has a pending invite to an organization. An email has been re-sent which contains a link to join the organization.'
export const FORGOT_PASSWD_EMAIL_CONTENT_HEADER = 'Reset your password'
export const FORGOT_PASSWD_EMAIL_CONTENT_MESSAGE = 'Click on the button below to reset your password for your Workyard account.'
export const FORGOT_PASSWD_EMAIL_CONTENT_WARNING = 'If you did not make this request, please ignore this email and your password will remain the same.'

// FORGOT PASSWORD CONSTANTS
export const UNKNOWN_USER_EMAIL = `unknown.user.${Math.floor(Math.random() * 900) + 100}${Cypress.env('appEnv')}@workyard.testinator.com`
export const INVALID_EMAIL = 'invalid.email.' + Cypress.env('appEnv')
// TODO: We need to permanently add existing.user.ENV@workyard.testinator.com to each ENV
export const EXISTING_USER_EMAIL = 'existing.user.' + Cypress.env('appEnv') + '@workyard.testinator.com'
// TODO: We need to permanently add pending.user.ENV@workyard.testinator.com to each ENV
export const PENDING_USER_EMAIL = 'pending.user.' + Cypress.env('appEnv') + '@workyard.testinator.com'

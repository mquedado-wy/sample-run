import {
  FP_EMAIL_EXISTINGUSER_CONTENT_HEADER,
  FP_EMAIL_EXISTINGUSER_CONTENT_MESSAGE,
  FP_EMAIL_EXISTINGUSER_CONTENT_WARNING,
  EXISTING_USER_EMAIL
} from '../../utilities/forgot-password/forgot-passwd-messages-constants'

const mailinatorBearerToken = Cypress.env('mailinatorBearerToken')
const expectedContentResetPasswordEmail = [
  FP_EMAIL_EXISTINGUSER_CONTENT_HEADER,
  FP_EMAIL_EXISTINGUSER_CONTENT_MESSAGE,
  FP_EMAIL_EXISTINGUSER_CONTENT_WARNING
]
describe('Verify the contents of the forgot password email', () => {
  before(() => {
    cy.resetPasswordRequest()
  })
  it('should make a successful GET request', () => {
    // This timeout is needed for a delay for waiting for the mailinator inbox to be refreshed
    // And make sure that the mailinator inbox have the
    cy.wait(10000)
    cy.request({
      method: 'GET',
      url: 'https://mailinator.com/api/v2/domains/private/inboxes?limit=1&sort=descending',
      timeout: 20000,
      headers: {
        Authorization: mailinatorBearerToken
      }
    }).then((inboxResponse) => {
      // Verify that the response status is 200 OK
      expect(inboxResponse.status).to.equal(200)
      expect(inboxResponse.body.msgs[0]).to.have.property('id')
      const msgId = inboxResponse.body.msgs[0].id
      const msgTo = inboxResponse.body.msgs[0].to
      const msgSubject = inboxResponse.body.msgs[0].subject
      cy.wrap(msgId).as('msgId')
      cy.wrap(msgTo).as('msgTo')

      // Initial Check if the email was sent to the correct user
      expect(EXISTING_USER_EMAIL).to.have.contain(msgTo)
      cy.wrap(msgSubject).as('msgSubject')
      // Initial Check if the email has the correct subject for forgot password
      expect(msgSubject).to.contain('Workyard Password Reset')

      cy.request({
        method: 'GET',
        url: `https://mailinator.com/api/v2/domains/private/messages/${msgId}`
      // Additional request details
      }).then((response) => {
        // Verify that the response status is 200 OK
        expect(response.status).to.equal(200)
        // Verify the body.headers responses
        expect(response.body.headers).to.have.property('x-mailgun-template-name', 'password_reset')
        // Verify the sender of the emeail is correct
        expect(response.body.headers).to.have.property('sender', 'hello@mail.workyard.com')
        // Verify if the email has the correct subject for forgot password
        expect(response.body.headers).to.have.property('subject', 'Workyard Password Reset')
        // Verify if the forgot password was sent to correct user
        expect(response.body.headers).to.have.property('to', EXISTING_USER_EMAIL)

        // Verify the body responses
        // Verify that the email was from 'Workyard'
        expect(response.body).to.have.property('from', 'Workyard')
        // Verify the sender of the emeail is correct
        expect(response.body).to.have.property('origfrom', 'Workyard <hello@mail.workyard.com>')
        // Verify if the forgot password was sent to correct user
        expect(response.body).to.have.property('to', msgTo)
        // Verify if the msgId matches from the request
        expect(response.body).to.have.property('id', msgId)
        // expect(response.body).to.have.property('time', 1705896579000)
        expect(response.body).to.have.property('seconds_ago').to.be.a('number')

        // Verify the content of the reset password email
        expectedContentResetPasswordEmail.forEach(expectedContentResetPasswordEmail => {
          expect(response.body.parts[0].body).to.include(expectedContentResetPasswordEmail)
        })
      })
      cy.request({
        method: 'GET',
        url: `https://mailinator.com/api/v2/domains/private/messages/${msgId}/links`,
        headers: {
          Authorization: mailinatorBearerToken
        }
      }).then((response) => {
        // Verify that the response status is 200 OK
        expect(response.status).to.equal(200)
        // Verify that the reset password hyperlink contains the correct staging url
        expect(response.body.links[0]).to.have.contains('https://www.stagingworkyardwebsite.com/u/crew_app/reset_password/')
      })
      // This is to cleanup the latest forgot password email
      cy.request({
        method: 'DELETE',
        url: `https://mailinator.com/api/v2/domains/private/messages/${msgId}`,
        headers: {
          Authorization: mailinatorBearerToken
        }
      }).then((response) => {
        // Verify that the response status is 200 OK
        expect(response.status).to.equal(200)
      })
    })
  })
})
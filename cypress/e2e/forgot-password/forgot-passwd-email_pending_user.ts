import {
  FP_EMAIL_PENDINGUSER_CONTENT_HEADER,
  FP_EMAIL_PENDINGUSER_CONTENT_MESSAGE,
  FP_EMAIL_PENDINGUSER_CONTENT_INFO,
  PENDING_USER_EMAIL
} from '../../utilities/forgot-password/forgot-passwd-messages-constants'

const mailinatorBearerToken = Cypress.env('mailinatorBearerToken')
const expectedContentPendingInviteEmail = [
  FP_EMAIL_PENDINGUSER_CONTENT_HEADER,
  FP_EMAIL_PENDINGUSER_CONTENT_MESSAGE,
  FP_EMAIL_PENDINGUSER_CONTENT_INFO
]
interface Mail {
  subject: string
  domain: string
  from: string
  to: string
}

interface MailinatorResponse {
  msgs: Mail[]
}
describe('should verify if Mailinator Inbox has the expected email to be verified', function () {
  before(() => {
    cy.resendEmailInviteRequest()
  })
  const checkMailinatorInbox = (attemptCount: number): void => {
    if (attemptCount > 5) {
      throw new Error('Exceeded maximum retry attempts')
    }

    cy.request({
      method: 'GET',
      url: 'https://mailinator.com/api/v2/domains/private/inboxes?limit=1&sort=descending',
      headers: {
        Authorization: mailinatorBearerToken
      }
    }).then(response => {
      const emails = response.body as MailinatorResponse

      if (emails.msgs !== null && emails.msgs !== undefined && emails.msgs.length > 0) {
        // Verify if there are messages, proceed with assertions
        expect(emails.msgs[0].subject).to.equal('Mark Quedado invited you to join Workyard')
        expect(emails.msgs[0].domain).to.equal('workyard.testinator.com')
        expect(emails.msgs[0].to).to.equal('pending.user.staging')
        expect(emails.msgs[0].from).to.equal('Workyard')
      } else {
        // If no messages, it will retry based on the attemptCount
        cy.wait(1000)
        checkMailinatorInbox(attemptCount + 1)
      }
    })
  }
  // Recursively calling the checkMailinatorInbox method
  it('should check if the inbox has message to be verified', function () {
    checkMailinatorInbox(1)
  })
})
describe('Verify the contents of the forgot password email', () => {
  it('should make a successful GET request', () => {
    cy.request({
      method: 'GET',
      url: 'https://mailinator.com/api/v2/domains/private/inboxes?limit=1&sort=descending',
      headers: {
        Authorization: mailinatorBearerToken
      }
    }).then((response) => {
      // Verify that the response status is 200 OK
      expect(response.status).to.equal(200)
      expect(response.body.msgs[0]).to.have.property('id')
      const msgId = response.body.msgs[0].id
      const msgTo = response.body.msgs[0].to
      const msgSubject = response.body.msgs[0].subject
      cy.wrap(msgId).as('msgId')
      cy.wrap(msgTo).as('msgTo')
      // Initial Check if the email was sent to the correct user
      expect(PENDING_USER_EMAIL).to.have.contain(msgTo)
      cy.wrap(msgSubject).as('msgSubject')
      // Initial Check if the email has the correct subject for forgot password
      expect(msgSubject).to.contain('Mark Quedado invited you to join Workyard')

      cy.request({
        method: 'GET',
        url: `https://mailinator.com/api/v2/domains/private/messages/${msgId}`
        // Additional request details
      }).then((response) => {
        // Verify that the response status is 200 OK
        expect(response.status).to.equal(200)
        // Verify the body.headers responses
        expect(response.body.headers).to.have.property('x-mailgun-template-name', 'employee_invitation')
        // Verify the sender of the emeail is correct
        expect(response.body.headers).to.have.property('sender', 'hello@mail.workyard.com')
        // Verify if the email has the correct subject for forgot password
        expect(response.body.headers).to.have.property('subject', 'Mark Quedado invited you to join Workyard')
        // Verify if the forgot password was sent to correct user
        expect(response.body.headers).to.have.property('to', PENDING_USER_EMAIL)

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
        expectedContentPendingInviteEmail.forEach(expectedContentPendingInviteEmail => {
          expect(response.body.parts[0].body).to.include(expectedContentPendingInviteEmail)
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
        expect(response.body.links[0]).to.have.contains('https://www.stagingworkyardwebsite.com/u/invite/')
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

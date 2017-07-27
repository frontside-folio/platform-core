const Nightmare = require('nightmare')
const assert = require('assert')
const config = require('../folio-ui.config.js')

describe('Login Page ("120-auth-fail.js")', function () {
  this.timeout('20s')

  let nightmare = null
  beforeEach(() => {
    // show true lets you see wth is actually happening :)
    nightmare = new Nightmare(config.nightmare)
  })

  describe('given bad data', () => {
    it('Should find a login error message', done => {
      nightmare
      .goto(config.url)
      .type(config.select.username, 'notgonnawork')
      .type(config.select.password, 'invalid password')
      .click(config.select.submit)
      .wait('span[class^="loginError"]') // failure
      .wait(parseInt(process.env.FOLIO_UI_DEBUG) ? parseInt(config.debug_sleep) : 0) // debugging
      .end()
      .then(result => { done() })
      .catch(done)
    })
  })
})

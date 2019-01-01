/* eslint-disable no-unused-expressions */
const rewire = require('rewire')
const log = require('../../lib/logger')
const App = rewire('../../index')

describe('App', () => {
  describe('#start', () => {
    const sandbox = sinon.createSandbox()

    beforeEach(() => {
      sandbox.stub(log, 'debug')
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should', () => {
      App.start()
      true.should.be.true
    })
  })
})

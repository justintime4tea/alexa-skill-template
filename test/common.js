let chai = require('chai')
let sinonChai = require('sinon-chai')
let sinon = require('sinon')

chai.use(sinonChai)
chai.should()
chai.config.includeStack = true

global.expect = chai.expect
global.AssertionError = chai.AssertionError
global.Assertion = chai.Assertion
global.assert = chai.assert
global.sinon = sinon

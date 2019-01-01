// istanbul ignore file
const LogRocket = require('logrocket')
const logger = require('pino')({
  prettyPrint: true,
  level: 'trace',
  timestamp: false,
  base: {hostname: ''}
})

const LOG_LEVEL = parseInt(process.env.LOG_LEVEL) || 7
const ROLLBAR_TOKEN = process.env.SUPER_SECRET || ''
// TODO: Remove this SuperSecret non-sense and make use of ENV vars

let Rollbar = require('rollbar')

let rollbar = null
let logrocket = null

/**
 * Logger component for logging
 */
class Logger {
  /**
   * Enable LogRocket support
   * @static
   */
  static enableLogRocket() {
    if (logrocket) {
      return
    }

    LogRocket.init('eratqs/testprojectjs')
    LogRocket.identify('TEST_USER_ID', {
      name: 'Justin Gross',
      email: 'jgross.biz@gmail.com',
      // Add your own custom user variables here, ie:
      demoApp: 'true',
    })
  }

  /**
   * Enable Rollbar support
   */
  static enableRollbar() {
    if (rollbar) {
      return
    }

    if (ROLLBAR_TOKEN) {
      rollbar = new Rollbar(ROLLBAR_TOKEN)
      rollbar.configure({
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
          environment: process.env.NODE_ENV || 'unknown',
          person: {
            id: 1,
            username: 'Justin Gross',
            email: 'jgross.biz@gmail.com'
          },
        }
      })
    }
  }

  /**
   * Log an informative message
   * @param {string} message to be logged
   */
  static info(message) {
    if (LOG_LEVEL >= 5) {
      logger.info(message)
      if (rollbar) {
        rollbar.info(message)
      }
    }
  }

  /**
   * Log a debug message
   * @param {string} message to be logged
   */
  static debug(message) {
    if (LOG_LEVEL >= 7) {
      logger.debug(message)
      if (rollbar) {
        rollbar.debug(message)
      }
    }
  }

  /**
   * Log a warning message
   * @param {string} message to be logged
   */
  static warn(message) {
    if (LOG_LEVEL >= 4) {
      logger.warn(message)
      if (rollbar) {
        rollbar.warn(message)
      }
    }
  }

  /**
   * Log an error message
   * @param {string} message to be logged
   */
  static error(message) {
    if (LOG_LEVEL >= 3) {
      logger.error(message)
      if (rollbar) {
        rollbar.error(message)
      }
    }
  }

  /**
   * Log a fatal error message
   * @param {string} message to be logged
   */
  static fatal(message) {
    if (LOG_LEVEL >= 2) {
      logger.fatal(message)
      if (rollbar) {
        rollbar.fatal(message)
      }
    }
  }

  /**
  * Log trace messages to console
  * @static
  * @param {string} message - The message to log
  */
  static trace(message) {
    if (LOG_LEVEL >= 6) {
      // Strip leading working directory (win and nix/mac)
      const pathString = `${process.cwd()}`.replace(/\\/gm, '.')
      const cwdRegex = RegExp(`${pathString}.`, 'gm')
      const t = new Error().stack.split('Error')[1].replace(cwdRegex, '')
      logger.trace([message, t].join(' '))
      if (rollbar) {
        rollbar.trace(message)
      }
    }
  }
}
module.exports = Logger

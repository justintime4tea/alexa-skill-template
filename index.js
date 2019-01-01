const log = require('./lib/logger')
const Api = require('./lib/api')

const TAG = '[Main]'

/**
 * AlexaSkillService component
 */
class AlexaSkillService {
  /**
   * Starts the Alexa skill service API
   */
  static start() {
    log.info(`${TAG} Starting alexa skill service`)
    const api = new Api()
    api.start().catch(err => {
      log.error(err)
    })
  }
}

if (process.env.NODE_ENV !== 'test') {
  AlexaSkillService.start()
}

module.exports = AlexaSkillService

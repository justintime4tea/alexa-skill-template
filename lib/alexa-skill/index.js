const Alexa = require('ask-sdk')
const LaunchHandler = require('./launch-handler')
const HelpHandler = require('./help-handler')
const StopCancelHandler = require('./stop-cancel-handler')
const SessionEndedHandler = require('./session-ended-handler')

/**
 * Our Alexa Skill class which encapsulates all things related to the
 * functionality of our skill!
 */
class AlexaSkill {
  /**
   * Contructs a new AlexaSkill instance
   */
  constructor() {
    this.skill = Alexa.SkillBuilders
      .custom()
      .addRequestHandlers(
        LaunchHandler,
        HelpHandler,
        StopCancelHandler,
        SessionEndedHandler
      )
      .create()
  }

  /**
   * Invoke the Alexa Skill!
   *
   * @param  {object} request The HTTP Request Body object.
   * @return {Promise} A promise to resolve or produce an error.
   */
  invoke(request) {
    return this.skill.invoke(request)
  }
}

module.exports = AlexaSkill

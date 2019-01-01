/**
 * The launch handler that is called when the skill launches
 */
class LaunchHandler {
  /**
   * Determines if can handle the request!
   *
   * @static
   * @param  {*} handlerInput Handler input.
   * @returns {boolean} Whether or not the request can be handled.
   */
  static canHandle(handlerInput) {
    if (!handlerInput ||
      !handlerInput.requestEnvelope ||
      !handlerInput.requestEnvelope.request ||
      !handlerInput.requestEnvelope.request.type) {
      return false
    }
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  }


  /**
   * Handles the hello world request!
   *
   * @static
   * @param  {*} handlerInput Handler input.
   * @returns {*} Handler response.
   */
  static handle(handlerInput) {
    const speechText = 'Woo hoo, we did it Frank!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Success!', speechText)
      .getResponse()
  }
}

module.exports = LaunchHandler

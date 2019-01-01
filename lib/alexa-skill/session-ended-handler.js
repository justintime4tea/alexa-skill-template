/**
 * The launch handler that is called when the skill launches
 */
class SessionEndedHandler {
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

    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  }

  /**
   * Handles the hello world request!
   *
   * @static
   * @param  {*} handlerInput Handler input.
   * @returns {*} Handler response.
   */
  static handle(handlerInput) {
    // TODO: Clean up logic!
    return handlerInput.responseBuilder.getResponse()
  }
}

module.exports = SessionEndedHandler

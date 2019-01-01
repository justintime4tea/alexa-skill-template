/**
 * The launch handler that is called when the skill launches
 */
class StopCancelHandler {
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
      !handlerInput.requestEnvelope.request.type ||
      !handlerInput.requestEnvelope.request.intent ||
      !handlerInput.requestEnvelope.request.intent.name) {
      return false
    }

    const isIntent = handlerInput.requestEnvelope
      .request.type === 'IntentRequest'
    const isHelpIntent = handlerInput.requestEnvelope
      .request.intent.name === 'AMAZON.HelpIntent'

    return isIntent && isHelpIntent
  }


  /**
   * Handles the help request!
   *
   * @static
   * @param  {*} handlerInput Handler input.
   * @returns {*} Handler response.
   */
  static handle(handlerInput) {
    const speechText = 'You will get no help from me!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('All your base are belong to us!', speechText)
      .getResponse()
  }
}

module.exports = StopCancelHandler

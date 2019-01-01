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
    const isCancel = handlerInput.requestEnvelope
      .request.intent.name === 'AMAZON.CancelIntent'
    const isStop = handlerInput.requestEnvelope
      .request.intent.name === 'AMAZON.StopIntent'

    return isIntent && (isCancel || isStop)
  }


  /**
   * Handles the hello world request!
   *
   * @static
   * @param  {*} handlerInput Handler input.
   * @returns {*} Handler response.
   */
  static handle(handlerInput) {
    const speechText = 'Thank you for using my awesome skills!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('You are a special person.', speechText)
      .getResponse()
  }
}

module.exports = StopCancelHandler

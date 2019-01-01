const fs = require('fs')
const path = require('path')
const createFastifyInstance = require('fastify')
const cors = require('cors')
// const fastifyPlugin = require('fastify-plugin')
const fastifySwagger = require('fastify-swagger')
const AlexaSkill = require('../alexa-skill')
const log = require('../logger')

const TAG = '[Api]'

/**
* An HTTP API
*/
class Api {
  /**
 * Constructs an ApiService
 *
 * @param {number} [port=443] The port for the API service to listen on.
 * @param {string} [host='127.0.0.1'] The port for the API service to
 *    listen on.
 */
  constructor({port = 443, host = '0.0.0.0'} = {}) {
    this.port = port
    this.host = host
  }

  /**
   * Starts the EliteAp
   */
  async start() {
    log.info(`${TAG} Starting API`)

    const alexaSkill = new AlexaSkill()
    // NOTE: According to fastify this is slow; use nginx or apache
    /* eslint-disable security/detect-non-literal-fs-filename */
    const api = createFastifyInstance({
      https: {
        key: fs.readFileSync(path.join(__dirname, '../../private.key')),
        cert: fs.readFileSync(path.join(__dirname, '../../private.crt'))
      }
    })
    /* eslint-enable security/detect-non-literal-fs-filename */
    api.use(cors())
    api.decorate('host', `http://${this.host}:${this.port}`)
    api.decorate('handlers', this.handlers)

    api.register(fastifySwagger, {
      swagger: {
        info: {
          title: 'Alexa Skill Template API',
          description: 'A template API for an Alexa Skill.',
          version: '0.0.1'
        },
        host: `${this.host}:${this.port}`,
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json']
      },
      exposeRoute: true
    })

    api.get('/', async (request, reply) => {
      return reply.redirect('/documentation')
    })

    api.post('/', async (request, reply) => {
      try {
        const response = await alexaSkill.invoke(request.body)
        if (response) {
          log.debug(`${TAG} ${JSON.stringify(response, null, 2)}`)
        } else {
          log.debug('Response was undefined!')
        }
        return reply.code(200).send(response)
      } catch (err) {
        log.error(`${TAG} ${err}`)
        return reply.code(500).send(err)
      }
    })

    try {
      const host = await api.listen(this.port, this.host)
      log.info(`${TAG} Listing on ${host}`)
    } catch (err) {
      log.error(`${TAG} ${err.message}`)
    }
  }
}

module.exports = Api

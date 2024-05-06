'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User')
const jwt = require('jsonwebtoken');
const Env = use('Env')

class VerifyToken {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {
    try {
      const token = request.header('Authorization').replace('Bearer ', '');
      if (!token) {
        return response.status(401).json({ message: 'token not provided' });
      }
      const tokenVerify = jwt.decode(token, Env.get('APP_KEY'));
      const user = await User.findOrFail(tokenVerify.uid);

      await next();

    } catch (error) {
      console.log(error)
      return response.status(401).json({ message: 'invalid token' });

    }

  }
}

module.exports = VerifyToken


'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const jwt = require('jsonwebtoken');
const Env = use('Env')
const User = use('App/Models/User')

class VerifyAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response }, next) {

    try {
      
      const token = request.header('Authorization').replace('Bearer ', '');      
      const tokenVerify = jwt.decode(token, Env.get('APP_KEY'));
      let user = await User.findOrFail(tokenVerify.uid);
      user = user.toJSON();
      if (user.role == 1) {
        await next();
      }
      else {
        return response.status(403).json({ message: 'forbidden' });
      }
    } catch (error) {
      console.log(error)
      return response.status(401).json({ message: 'invalid token' });
    }

  }
}

module.exports = VerifyAdmin

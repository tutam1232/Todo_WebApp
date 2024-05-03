'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const UserModel = use('App/Models/UserModel')
const jwt = require('jsonwebtoken');
const Env = use('Env')

class VerifyToken {
  constructor(props) {
    this.userModel = new UserModel();
  }
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
      //const tokenVerify = jwt.verify(token, Env.get('APP_KEY'));
      const user = await userModel.get(tokenVerify.id);

      await next();

    } catch (error) {

      return response.status(401).json({ message: 'invalid token' });

    }

  }
}

module.exports = VerifyToken


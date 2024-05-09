'use strict'

const bcrypt = require('bcrypt')
const Env = use('Env')

const UserHook = module.exports = {}

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} userInstance
 *
 * @return {void}
 */
UserHook.hashPassword = async (userInstance) => {
  
  if(userInstance.dirty.password){
    userInstance.password = userInstance.password = await bcrypt.hash(userInstance.password, Number(Env.get('SALT_ROUND')))
  }

}

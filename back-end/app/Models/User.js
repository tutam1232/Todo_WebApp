'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    // this.addHook('beforeSave', async (userInstance) => {
    //   if (userInstance.dirty.password) {
    //     userInstance.password = await Hash.make(userInstance.password)
    //   }
    // })

    this.addHook('beforeSave', 'UserHook.hashPassword')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  // tokens () {
  //   return this.hasMany('App/Models/Token')
  // }

  static get table(){
    return 'user';
  }
  static get createdAtColumn () {
    return null
  }
  static get updatedAtColumn () {
    return null
  }
  todos(){
    return this.hasMany('App/Models/Todo','id','uid')
  }
  role(){
    return this.belongsTo('App/Models/Role','role','id')
  }

  

  //primaryKey is default set to 'id'

}

module.exports = User

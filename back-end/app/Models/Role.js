'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Role extends Model {
    static get table() {
        return 'role'
    }
    static get createdAtColumn() {
        return null
    }
    static get updatedAtColumn() {
        return null
    }
}

module.exports = Role

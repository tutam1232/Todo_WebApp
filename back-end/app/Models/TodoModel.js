const Database = use('Database')    

class TodoModel {
    async getAll() {
        let todos = await Database.table('todo')
        return todos
    }

    async add (name) {
        let id = await Database.insert({name: name}).into('todo').returning('id')
        return id
    }

    async update(id, name) {
        await Database.table('todo').where('id', id).update('name', name)
    }

    async delete(id) {
        await Database.table('todo').where('id', id).delete()
    }
}

module.exports = TodoModel
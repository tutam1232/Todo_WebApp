const Database = use('Database')    

class TodoModel {
    async getAll() {
        let todos = await Database.table('todo')
        return todos
    }

    async add (id,name) {
        await Database.insert({id:id,name: name}).into('todo').returning('id')
    }

    async update(id, name) {
        await Database.table('todo').where('id', id).update('name', name)
    }

    async delete(id) {
        await Database.table('todo').where('id', id).delete()
    }
}

module.exports = TodoModel
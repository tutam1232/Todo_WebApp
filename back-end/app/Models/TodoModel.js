const Database = use('Database')    

class TodoModel {
    async getAll() {
        let todos = await Database.table('todo').orderBy('index', 'asc')
        return todos
    }

    async add (name, username) {
        let id = await Database.insert({name: name, username: username}).into('todo').returning('id')
        return id
    }

    async update(id, name) {
        await Database.table('todo').where('id', id).update('name', name)
    }

    async delete(id) {
        await Database.table('todo').where('id', id).delete()
    }

    async reorder(id1, id2){
        let todo1 = await Database.table('todo').where('id', id1).first()
        let todo2 = await Database.table('todo').where('id', id2).first()
        let index1 = todo1.index
        let index2 = todo2.index

        await Database.table('todo').where('id', id1).update('index', index2)
        await Database.table('todo').where('id', id2).update('index', index1)
    }
}

module.exports = TodoModel
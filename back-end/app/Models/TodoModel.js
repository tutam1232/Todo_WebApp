const Database = use('Database')    

class TodoModel {
    getAll = async () => {
        let todos = await Database.table('todos')
        return todos
    }

    add = async (name) => {
        await Database.insert({name: name}).into('todos').returning('id')
    }

    updateTodo = async (id, name) => {
        await Database.table('todos').where('id', id).update('name', name)
    }

    deleteTodo = async (id) => {
        await Database.table('todos').where('id', id).delete()
    }
}

module.exports = TodoModel
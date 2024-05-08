const Todo = use('App/Models/Todo')
const User = use('App/Models/User')

class TodoService {

    async getTodos(request) {
        try {
            let todos = await Todo.query().orderBy('index', 'asc').fetch();
            todos = todos.toJSON();

            for (let i = 0; i < todos.length; i++) {
                let user = await User.find(todos[i].uid);
                user = user.toJSON();
                todos[i].username = user.username;
            }

            return todos
        } catch (error) {
            throw ('server error')
        }
    }

    async getTodosByUser(request) {
        try {
            const { id } = request.params;
            let user = await User.find(id);

            if (!user) {
                throw ('user not existed')
            }
            let todos = await user.todos().fetch();
            todos = todos.toJSON();

            
            for (let i = 0; i < todos.length; i++) {
                let user = await User.find(todos[i].uid);
                user = user.toJSON();
                todos[i].username = user.username;
            }

            return todos
        } catch (error) {
            console.log(error)
            if (error == 'user not existed') {
                throw ('user not existed')
                
            }
            throw ('server error')
        }
    }

    async addTodo(request) {
        try {
            let { name, uid } = request.body;
            let todo = new Todo();
            let user = await User.findOrFail(uid);
            user = user.toJSON();


            todo.name = name;
            todo.uid = uid;
            await todo.save();
            let id = todo.id;

            const data = {
                id: id,
                username: user.username
            }

            return data
        } catch (error) {
            throw ('server error')
        }
    }

    async updateTodo(request) {
        try {
            let { name } = request.body;
            let id = request.params.id;

            let todo = await Todo.findOrFail(id);
            todo.name = name;
            await todo.save();

            return
        } catch (error) {
            throw ('server error')
        }
    }

    async deleteTodo(request) {
        try {
            let id = request.params.id;

            let todo = await Todo.findOrFail(id);
            await todo.delete();

            return
        } catch (error) {
            throw ('server error')
        }
    }


    async reorderTodo(request) {
        try {
            let id1 = request.params.id1;
            let id2 = request.params.id2;

            let todo1 = await Todo.findOrFail(id1);
            let todo2 = await Todo.findOrFail(id2);

            let index1 = todo1.index;
            let index2 = todo2.index;

            todo1.index = index2;
            todo2.index = index1;

            await todo1.save();
            await todo2.save();

            return
        } catch (error) {
            throw ('server error')
        }
    }
}

module.exports = TodoService
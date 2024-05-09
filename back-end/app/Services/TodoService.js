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

            let maxTodoByIndex = await Todo.query().orderBy('index', 'desc').first();
            if (maxTodoByIndex) {
                todo.index = maxTodoByIndex.index + 1024;
            }//TODO: move to beforeCreate hook

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

            let nextIndex = null;
            let preIndex = null;

            if (todo1.index < todo2.index) { //drag top to bottom
                preIndex = todo2.index;

                let tempTodo = await Todo.query().where('index', '>', todo2.index).orderBy('index', 'asc').first();
                if (tempTodo)
                    nextIndex = tempTodo.index;
                else
                    nextIndex = todo2.index + (1024 / 2);
            }
            else if (todo1.index > todo2.index) { //drag bottom to top
                nextIndex = todo2.index;

                let tempTodo = await Todo.query().where('index', '<', todo2.index).orderBy('index', 'desc').first();
                if (tempTodo)
                    preIndex = tempTodo.index;
                else
                    preIndex = todo2.index - (1024 / 2);
            }

            let index = Math.round((nextIndex + preIndex) / 2)

            todo1.index = index
            await todo1.save();

            return
        } catch (error) {
            console.log(error)
            throw ('server error')
        }
    }
}

module.exports = TodoService
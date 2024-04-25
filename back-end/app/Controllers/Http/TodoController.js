'use strict'
const TodoModel = use('App/Models/TodoModel')


class TodoController {
    async getTodos({ request, response }) {
        try {
            let todos = await TodoModel.getAll()
            return response.status(200).json(todos)
        } catch (error) {
            return response.status(500).json({ message: 'server error' })
        }
    }

    async addTodo({ request, response }) {
        try {
            let {name} = request.body;
            await TodoModel.add(name)
            return response.status(200);
        } catch (error) {
            return response.status(500).json({ message: 'server error' })
        }
    }

    async updateTodo({ request, response }) {
        try {
            let {name} = request.body;
            let id = request.params.id;
            await TodoModel.update(id, name)
            return response.status(200);
        } catch (error) {
            return response.status(500).json({ message: 'Internal server error' })
        }
    }

    async deleteTodo({ request, response }) {
        try {
            let id = request.params.id;
            await TodoModel.delete(id)
            return response.status(200);
        } catch (error) {
            return response.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = TodoController

'use strict'
const TodoModel = use('App/Models/TodoModel')


class TodoController {
    constructor(props){
        this.todoModel = new TodoModel();
    }
    async getTodos({ request, response }) {
        try {
            let todos = await this.todoModel .getAll()
            return response.status(200).json(todos)
        } catch (error) {
            return response.status(500).json({ message: 'server error' })
        }
    }

    async addTodo({ request, response }) {
        try {
            let {id,name} = request.body;
            await this.todoModel.add(id,name)
            return response.status(200).json({ message: 'complete' });
        } catch (error) {
            return response.status(500).json({ message: 'server error' })
        }
    }

    async updateTodo({ request, response }) {
        try {
            let {name} = request.body;
            let id = request.params.id;
            await this.todoModel.update(id, name)
            return response.status(200).json({ message: 'complete' });
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: 'server error' })
        }
    }

    async deleteTodo({ request, response }) {
        try {
            let id = request.params.id;
            await this.todoModel.delete(id)
            return response.status(200).json({message: 'complete'});
        } catch (error) {
            return response.status(500).json({ message: 'server error' })
        }
    }
}

module.exports = TodoController

'use strict'
const TodoService = use('App/Services/TodoService')

class TodoController {
    constructor() {
        this.todoService = new TodoService()
    }
    async getTodos({ request, response }) {
        try {

            let data = await this.todoService.getTodos(request)
            return response.status(200).json(data)

        } catch (error) {
            return response.status(500).json({ message: error })

        }
    }

    async getTodosByUser({ request, response }) {
        try {

            let data = await this.todoService.getTodosByUser(request)
            return response.status(200).json(data)

        } catch (error) {
            return response.status(500).json({ message: error })
        }
    }

    async addTodo({ request, response }) {
        try {

            let data = await this.todoService.addTodo(request)
            return response.status(200).json(data)

        } catch (error) {
            return response.status(500).json({ message: error })
        }

    }

    async updateTodo({ request, response }) {

        try {
            await this.todoService.updateTodo(request)
            return response.status(200).json()
        } catch (error) {
            return response.status(500).json({ message: error })
        }

    }

    async deleteTodo({ request, response }) {

        try {

            await this.todoService.deleteTodo(request)
            return response.status(200).json()

        } catch (error) {
                
                return response.status(500).json({ message: error })

        }

    }

    async reorderTodo({ request, response }) {

        try {

            await this.todoService.reorderTodo(request)
            return response.status(200).json()

        } catch (error) {
            return response.status(500).json({ message: error })
        }

    }
}

module.exports = TodoController

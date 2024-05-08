'use strict'
const UserService = use('App/Services/UserService')

class UserController {

    constructor() {
        this.userService = new UserService()
    }

    async register({ request, response }) {
        try {

           await this.userService.register(request)
           return response.status(200).json()

        } catch (error) {
            return response.status(500).json({ message: error })
        }
    }
    async login({ request, response, auth  }) {
        try {
          
            const data = await this.userService.login(request, auth)
            return response.status(200).json(data)

        } 
        catch (error) {
            return response.status(500).json({ message: error })

        }
    }

    async addUser({ request, response }) {
        try {
            await this.userService.addUser(request)
            return response.status(200).json()
        } catch (error) {
            return response.status(500).json({ message: error })
        }
    }

    async getUsers({ request, response }) {
        try {
            const data = await this.userService.getUsers(request)
            return response.status(200).json(data)
        } catch (error) {
            return response.status(500).json({ message: error })
        }
    }

    async getUser({ request, response }) {
        try {
            const data = await this.userService.getUser(request)
            return response.status(200).json(data)
        } catch (error) {
            return response.status(500).json({ message: error })
        }
    }

    async updateUser({ request, response }) {
        try {
            await this.userService.updateUser(request)
            return response.status(200).json()
        } catch (error) {
            return response.status(500).json({ message: error })
        }
    }

    async deleteUser({ request, response }) {
        try {
            await this.userService.deleteUser(request)
            return response.status(200).json()
        } catch (error) {
            return response.status(500).json({ message: error })
        }
    }
}

module.exports = UserController

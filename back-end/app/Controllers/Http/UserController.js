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
}

module.exports = UserController

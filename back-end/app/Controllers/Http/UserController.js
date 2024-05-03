'use strict'
const UserModel = use('App/Models/UserModel')
const bcrypt = use('bcrypt');
const Env = use('Env')

class UserController {
    constructor(props) {
        this.userModel = new UserModel();
    }
    async register({ request, response,auth }) {
        try {
            const { username, password } = request.body;
            const hashpassword = await bcrypt.hash(password, Number(Env.get('SALT_ROUND')))
            await this.userModel.add(username, hashpassword)

            return response.status(200).json({ message: 'register complete' })

        } catch (error) {
            console.log(error)
            if (error == 'username existed') {
                return response.status(409).json({ message: 'username existed' })
            }
            return response.status(500).json({ message: 'server error' })
        }
    }
    async login({ request, response, auth  }) {
        try {
            const { username, password } = request.body;
            const user = await this.userModel.get(username)
            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                return response.status(401).json({ message: 'wrong password' })
            }
            const token = await auth.generate({id: username})
            return response.status(200).json({ accessToken: token, username: username})

        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: 'server error' })
        }
    }
}

module.exports = UserController

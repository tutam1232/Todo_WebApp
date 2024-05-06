const User = use('App/Models/User')
const bcrypt = use('bcrypt');
const Env = use('Env')

class UserService{
    async register(request) {
        try {
            const { username, password } = request.body;
            const hashpassword = await bcrypt.hash(password, Number(Env.get('SALT_ROUND')))
            let user = new User();
            user.username = username;
            user.password = hashpassword;
            user.role = 'user';

            await user.save();

            return 

        } catch (error) {
            if (error == 'username existed') {
                throw new Error('username existed')
            }
            throw new Error('server error')
        }
    }
    async login(request, auth) {
        try {
            const { username, password } = request.body;
            let user = await User.findBy('username', username)
            if (!user) {
                throw new Error('username not existed')
            }

            user = user.toJSON()
            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                throw new Error('wrong password')
            }
            const token = await auth.generate({id: user.id})

            const data = {
                accessToken: token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            }
           
            return data

        } catch (error) {

            if (error == 'wrong password') {
                throw new Error('wrong password')
            }
            if (error == 'username not existed') {
                throw new Error('username not existed')
            }

            throw new Error('server error')

        }
    }

}

module.exports = UserService
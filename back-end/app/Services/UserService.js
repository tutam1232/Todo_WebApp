const User = use('App/Models/User')
const Role = use('App/Models/Role')
const bcrypt = use('bcrypt');

class UserService {
    async register(request) {
        try {
            const { username, password } = request.body;
            let user = new User();
            user.username = username;
            user.password = password;
            user.role = 2;

            await user.save();

            return

        } catch (error) {
            console.log(error)
            if (error.constraint == 'UNI_USER') {
                throw ('username existed')
            }
            throw ('server error')
        }
    }
    async login(request, auth) {
        try {
            const { username, password } = request.body;
            let user = await User.findBy('username', username)
            if (!user) {
                throw ('username not existed')
            }

            user = user.toJSON()
            const checkPassword = await bcrypt.compare(password, user.password)
            if (!checkPassword) {
                throw ('wrong password')
            }
            const token = await auth.generate({ id: user.id })

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
                throw ('wrong password')
            }
            if (error == 'username not existed') {
                throw ('username not existed')
            }

            throw ('server error')

        }
    }

    async addUser(request) {
        try {
            const { username, role, password } = request.body;
            let user = new User();
            user.username = username;
            user.role = role;
            user.password = password;

            await user.save();
            return
        } catch (error) {
            if (error.constraint == 'UNI_USER') {
                throw ('username existed, pls choose another username ')
            }
            throw ('server error')
        }
    }

    async getUsers(request) {
        try {
            let users = await User.all();
            users = users.toJSON();
            users = users.map(({ password, ...rest }) => rest);

            const role = await Role.all();
            const roles = role.toJSON();

            users = users.map(user => {
                const role = roles.find(role => role.id === user.role);
                user.role = role.name;
                return user;
            });

            return users
        } catch (error) {
            throw ('server error')
        }
    }

    async getUser(request) {
        try {
            const { id } = request.params;
            let user = await User.find(id)
            if (!user) {
                throw ('user not existed')
            }

            user = user.toJSON();
            const { password, ...rest } = user;            

            return rest

        } catch (error) {
            if (error == 'user not existed') {
                throw ('user not existed')
            }
            throw ('server error')
        }
    }

    async updateUser(request){
        try{
            const { id } = request.params;
            const { username, role, password } = request.body;

            let user = await User.find(id);
            if(!user){
                throw ('user not existed')
            }
            user.username = username;
            user.role = role;
             if(password){
                user.password = password;
             }

            await user.save();
            return
        }
        catch(error){
            console.log(error)
            if(error.constraint == 'UNI_USER'){
                throw ('username existed, pls choose another username ')
            }
                
            if(error == 'user not existed'){
                throw ('user not existed')
            }
            else 
                throw ('server error')
        }
    }

    async deleteUser(request){
        try {
            const { id } = request.params;
            let user = await User.find(id);
            if(!user){
                throw ('user not existed')
            }
            await user.delete();

            return
        } catch (error) {
            if(error == 'user not existed'){
                throw ('user not existed')
            }
            throw ('server error')
            
        }
    }

}

module.exports = UserService
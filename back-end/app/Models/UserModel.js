const Database = use('Database')    

class UserModel {
    async add(username,hashpassword){

        let user = await Database.table('user').where('username', username).first()
        if (user)
            throw new Error('User already exists')

        await Database.insert({username: username, password: hashpassword}).into('user')
    }

    async get(username){
        let user = await Database.table('user').where('username', username).first()

        if(!user)
            throw new Error('username existed')

        return user
    }
}

module.exports = UserModel
const Role = use('App/Models/Role')

class RoleService {
    async getRoles(request) {
        try {
            let roles = await Role.all();
            roles = roles.toJSON();

            return roles
        } catch (error) {
            throw ('server error')
        }
    } 
}

module.exports = RoleService
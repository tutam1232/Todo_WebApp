'use strict'
const RoleService = use('App/Services/RoleService')

class RoleController {
    constructor(){
        this.roleService = new RoleService();
    }
    async getRoles({request, response}){
        try{
            let data = await this.roleService.getRoles(request)
            return response.status(200).json(data)
        }catch(error){
            return response.status(500).json({message: error})
        }
    }
}

module.exports = RoleController

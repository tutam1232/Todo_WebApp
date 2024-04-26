const Database = use('Database')    

class BlogModel {
    async getAll() {
        let blogs = await Database.table('blog')
        return blogs
    }

    getById = async (id) => {
        let blog = await Database.table('blog').where('id', id).first()
        return blog
    }
}

module.exports = BlogModel
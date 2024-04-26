'use strict'

const BlogModel = use('App/Models/BlogModel')

class BlogController {

    constructor(props){
        this.blogModel = new BlogModel();
    }

    async getBlogs({ request, response }) {
        try {
            let blogs = await this.blogModel.getAll()
            return response.status(200).json(blogs)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ message: 'server error' })
        }
    }

    async getBlog({ request, response }) {
        try {
            let {id} = request.params
            let blog = await this.blogModel.getById(id)
            return response.status(200).json(blog)
        } catch (error) {
            return response.status(500).json({ message: 'server error' })
        }
    }
}

module.exports = BlogController

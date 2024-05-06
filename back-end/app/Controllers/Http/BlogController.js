'use strict'
const BlogService = use('App/Services/BlogService')


class BlogController {
    constructor() {
        this.blogService = new BlogService()
    }

    async getBlogs({ request, response }) {
        try {
            let data = await this.blogService.getBlogs(request)
            return response.status(200).json(data)

        } catch (error) {
            return response.status(500).json({ message: error })
        }
    }

    async getBlog({ request, response }) {
        try {
            let data = await this.blogService.getBlog(request)
            return response.status(200).json(data)
        } catch (error) {
            return response.status(500).json({ message: error })
        }
    }
}

module.exports = BlogController

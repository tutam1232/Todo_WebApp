const Blog = use('App/Models/Blog')

class BlogService {
    async getBlogs(request) {
        try {
            let blogs = await Blog.all()
            blogs = blogs.toJSON()
            
            return blogs
        } catch (error) {
            throw new Error('server error')
        }
    }

    async getBlog(request) {
        try {
            let {id} = request.params
            let blog = await Blog.findOrFail(id)
            blog = blog.toJSON()

            return blog
        } catch (error) {
            throw new Error('server error')
        }
    }
}

module.exports = BlogService
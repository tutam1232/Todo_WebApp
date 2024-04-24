import { useBlogs } from "../contexts/BlogsContext";

const Blog = ({id}) => {
    console.log("[Blog]")
    const blogs = useBlogs();
    const blog = blogs.find(blog => blog.id === id);

    return <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>{blog.name}</h1>
  };
  
  export default Blog;
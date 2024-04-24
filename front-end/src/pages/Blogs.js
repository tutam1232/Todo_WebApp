import { Outlet, Link } from "react-router-dom";
import styles from "../modules/style.module.css";
import { useBlogs } from "../contexts/BlogsContext";

const Blogs = () => {
    console.log("[Blogs]")
    const  blogs = useBlogs();

    return (
        <>
            <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>BLOG</h1>
            <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                <div className={styles.navbar} style={{width: "50%"}}>
                    {blogs.map(blog => (
                        <Link key={blog.id} className={styles.link} to={`/blog/${blog.id}`}>{blog.name}</Link>
                    ))}
                </div>
            </div>

            <Outlet />
        </>
    )
  };
  
  export default Blogs;
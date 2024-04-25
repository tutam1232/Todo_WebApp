import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useEffect } from "react";

import styles from "../modules/style.module.css";
import { useBlogs, useBlogsDispatch } from "../contexts/BlogsContext";
import Blog from "../components/Blog";
const API_URL = process.env.REACT_APP_API_URL

const Blogs = () => {
    console.log("[Blogs]")
    const blogs = useBlogs();
    const dispatch = useBlogsDispatch();

    const fetchBlogs = async function (API_URL) {
        //fetch with method get
        let fetched_blog = await fetch(API_URL + '/getblogs',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })    

        let fetched_blogJSON = await fetched_blog.json();

        if(fetched_blog.ok){
            dispatch({
                type: 'set_blogs',
                blogs: fetched_blogJSON
            })
        }

        //TODO: fix if fetched_blog not ok
    }

    useEffect(() => {
        fetchBlogs(API_URL);
        console.log("fetched blogs")
    }, [])

    return (
        <>


            <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>BLOG</h1>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div className={styles.navbar} style={{ width: "50%" }}>
                    {blogs.map(blog => (
                        <Link key={blog.id} className={styles.link} to={`/blog/${blog.id}`}>{blog.name}</Link>
                    ))}
                </div>
            </div>

            
            <Routes>
                {blogs.map(blog => (
                    <Route key={blog.id} path={blog.id.toString()} element={<Blog id={blog.id} />} />
                ))}
            </Routes>
        </>
    )
};

export default Blogs;
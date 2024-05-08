import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useEffect } from "react";

import styles from "../modules/style.module.css";
import { useBlogs, useBlogsDispatch } from "../contexts/BlogsContext";
import Blog from "../components/Blog";
import useLogout from "../hooks/useLogout";
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

const Blogs = () => {
    console.log("[Blogs]")
    const blogs = useBlogs();
    const dispatch = useBlogsDispatch();
    const logout = useLogout();


    useEffect(() => {
        const getData = async () => {
            let result = await fetchService('/getblogs', 'GET', null);
            if (result.ok) {
                let resultJSON = await result.json();
                dispatch({
                    type: 'set_blogs',
                    blogs: resultJSON
                })
            }
            else if (result.status === 401) {
                logout();
            }
            else {
                showErrorService(result);
            }
        }

        getData();
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
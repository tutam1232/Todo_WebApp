import { Outlet, Link } from "react-router-dom";
import styles from "../modules/style.module.css";

const Blog = () => {
    return (
        <>
            <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>BLOG</h1>
            <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
                <div className={styles.navbar} style={{width: "50%"}}>
                    <Link className={styles.link} to="/blog/1">Blog1</Link>
                    <Link className={styles.link} to="/blog/2">Blog2</Link>
                </div>
            </div>

            <Outlet />
        </>
    )
  };
  
  export default Blog;
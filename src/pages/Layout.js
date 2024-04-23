import { Outlet, Link } from "react-router-dom";
import styles from "../modules/style.module.css";

const Layout = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <Link className={styles.link} to="/">Home</Link>
                <Link className={styles.link} to="/blog">Blog</Link>
                <Link className={styles.link} to="/contact">Contact</Link>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;
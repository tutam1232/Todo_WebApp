import { Outlet, Link } from "react-router-dom";
import styles from "../modules/style.module.css";
import useLogout from "../hooks/useLogout";

const Layout = () => {

    const logout = useLogout();

    return (
        <>
            <nav className={styles.navbar}>
                <Link className={styles.link} to="/">Home</Link>
                <Link className={styles.link} to="/blog">Blog</Link>
                <Link className={styles.link} to="/contact">Contact</Link>
                <button onClick={logout}>Logout</button>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;
import { useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import styles from "../modules/style.module.css";
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

const Login = () => {

    console.log("[Login]")

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            let response = await fetchService('/login', 'POST', { username, password });

            if (response.ok) {

                const data = await response.json();
                const accessToken = data.accessToken?.token;
                //const accessToken = data.accessToken;
                const user = data.user;

                
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('id', user.id);
                localStorage.setItem('role', user.role);


                navigate(from, { replace: true });
            } else {
                showErrorService(response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        !accessToken ?
            <>
                <h1 style={{ textAlign: 'center', color: 'white' }}>Login</h1>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <form onSubmit={handleLogin} style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Link to="/register" className={styles.link}>Register</Link>
                </div>
            </>
            : <Navigate to="/" replace={true} />
    )
}

export default Login;
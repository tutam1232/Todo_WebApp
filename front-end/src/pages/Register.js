import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom'
import styles from '../modules/style.module.css'

const API_URL = process.env.REACT_APP_API_URL


const Register = () => {

  console.log("[Register]")

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(API_URL + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      if (response.ok) {
        alert('Register successful');

        navigate('/login');

      } else {
        alert('Register failed');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    !accessToken ?
      <>
        <h1 style={{ textAlign: 'center', color: 'white' }}>Register</h1>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleRegister} style={{ width: '30%', display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Link to="/login" className={styles.link}>Login</Link>
        </div>
      </>
      : <Navigate to="/" replace={true} />
  );
};

export default Register;

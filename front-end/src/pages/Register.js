import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom'
import styles from '../modules/style.module.css'

const API_URL = process.env.REACT_APP_API_URL


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



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
        //TODO: redirect to login in 5 seconds, fix UI to clock down

        setTimeout(() => {
          return <Navigate to="/login" />
        }, 3000);

      } else {
        console.log(response)
        alert('Register failed');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
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
  );
};

export default Register;

import { useState, useEffect } from "react";
import styles from '../modules/style.module.css'
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL

function AddUser() {

    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('1');

    const logout = useLogout();
    const navigate = useNavigate();

    const fetchRole = async function (API_URL) {
        let fetched_role = await fetch(API_URL + '/getroles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })

        if (fetched_role.ok) {
            let fetched_roleJSON = await fetched_role.json();
            setRoles(fetched_roleJSON);
        }
        else {
            if (fetched_role.status === 401)
                logout();
            throw new Error("fetch role failed")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password == '' || username == '' || role == '') {
            alert("Please fill in all fields")
            return
        }

        const response = await fetch(API_URL + '/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                username,
                password,
                role
            }),
        });

        if (response.ok) {
            alert('Register successful');

            navigate('/user');

        } else {
            if (response.status === 401)
                logout();
            else
                alert('Register failed');
        }
    }


    useEffect(() => {

        fetchRole(API_URL).then(() => {
            console.log("fetched roles")
        }).catch(err => {
            console.log(err)
        })

    }, [])


    return (
        <>
            <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>ADD USER</h1>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.editUserForm}>
                        <label>Username: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Role: </label>
                        <select name="role" value={role} onChange={e => setRole(e.target.value)}>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>

                        <div></div>

                        <button type="submit" style={{ width: '50%' }}>
                            Save
                        </button>
                    </div>



                </form>
            </div>
        </>
    )
}



export default AddUser;
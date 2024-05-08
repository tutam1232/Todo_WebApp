import { useState, useEffect } from "react";
import styles from '../modules/style.module.css'
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

function AddUser() {

    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('1');

    const logout = useLogout();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            let result = await fetchService('/getroles', 'GET', null);
            if (result.ok) {
                let resultJSON = await result.json();
                setRoles(resultJSON);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password == '' || username == '' || role == '') {
            alert("Please fill in all fields")
            return
        }

        let result = await fetchService('/adduser', 'POST', {
            username,
            password,
            role
        });

        if (result.ok) {
            alert('Register successful');
            navigate('/user');

        }
        else if (result.status === 401) {
            logout();
        }
        else {
            showErrorService(result);
        }
    }





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
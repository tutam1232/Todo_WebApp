import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import { useNavigate, useParams } from "react-router-dom";
import styles from '../modules/style.module.css'

const API_URL = process.env.REACT_APP_API_URL

function EditUser() {
    console.log("[EditUser]");
    const logout = useLogout();
    const { id } = useParams();
    const navigate = useNavigate();


    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const fetchUser = async function (API_URL) {
        let fetched_user = await fetch(API_URL + '/getuser/' + id.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })

        if (fetched_user.ok) {
            let fetched_userJSON = await fetched_user.json();
            return fetched_userJSON;
        }
        else {
            if (fetched_user.status === 401)
                logout();
            throw new Error("fetch user failed")
        }
    }

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
            return fetched_roleJSON;
        }
        else {
            if (fetched_role.status === 401)
                logout();
            throw new Error("fetch role failed")
        }
    }

    useEffect(() => {
        fetchUser(API_URL).then((fetchedUser) => {
            console.log("fetched user")
            setUsername(fetchedUser.username);
            setRole(fetchedUser.role);
        }).catch(err => {
            console.log(err)
        })

        fetchRole(API_URL).then((fetchedRole) => {
            console.log("fetched roles")
            setRoles(fetchedRole);
        }).catch(err => {
            console.log(err)
        })

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //TODO: handle when password is empty + password is not empty

        let result = await fetch(API_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                username: username,
                password:password,
                role: role
            })
        })

        if (result.ok) {
            alert('update success')
        }
        else {
            if (result.status === 401)
                logout();
            else {
                let resultJSON = await result.json();
                alert(resultJSON.message);
            }

        }
    }


    const handleDelete = async () => {
        let result = await fetch(API_URL + '/deleteuser/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })

        if (result.ok) {
            alert('delete success')

            navigate('/user');
        }
        else {
            if (result.status === 401)
                logout();
            else {
                let resultJSON = await result.json();
                alert(resultJSON.message);
            }
        }
    }


    return (
        <>
            <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>EDIT USER</h1>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                     {/*TODO: fix UI  */}
                    <div className={styles.editUserForm}>
                        <label>Username: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label>Role: </label>
                        <select name="role" value={role.toString()} onChange={e => setRole(e.target.value)}>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type="submit" style={{ width: '50%' }}>
                            Save
                        </button>
                        <button onClick={handleDelete} style={{ width: '50%' }}>
                            Delete
                        </button>
                    </div>

                </form>
            </div>
        </>
    )

}

export default EditUser;
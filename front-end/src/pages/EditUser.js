import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import { useNavigate, useParams } from "react-router-dom";
import styles from '../modules/style.module.css'
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

const USERNAME_REGEX = process.env.REACT_APP_USERNAME_REGEX;

function EditUser() {
    console.log("[EditUser]");
    const logout = useLogout();
    const { id } = useParams();
    const navigate = useNavigate();


    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [isEditPassword, setIsEditPassword] = useState(false);

    useEffect(() => {


        const getData = async () => {
            let resultUser = await fetchService(`/getuser/${id}`, 'GET', null);
            if (resultUser.ok) {
                let resultUserJSON = await resultUser.json();
                setUsername(resultUserJSON.username);
                setRole(resultUserJSON.role);
            }
            else if (resultUser.status === 401) {
                logout();
            }
            else {
                showErrorService(resultUser);
            }
        }

        const getRole = async () => {
            let resultRole = await fetchService('/getroles', 'GET', null);
            if (resultRole.ok) {
                let resultRoleJSON = await resultRole.json();
                setRoles(resultRoleJSON);
            }
            else if (resultRole.status === 401) {
                logout();
            }
            else {
                showErrorService(resultRole);
            }
        }

        getData();
        getRole();


    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usernameRegex = new RegExp(USERNAME_REGEX)

        if (!usernameRegex.test(username)) {
            alert('username must be 3 - 16 characters length and contain only letters, numbers, _, ., -');
            return;
        }
        if (isEditPassword && password === '') {
            alert('password cannot be empty');
            return;
        }

        let result = await fetchService('/updateuser/' + id, 'PUT', {
            username: username,
            password: password,
            role: role
        });

        if (result.ok) {
            alert('update success')
        }
        else {
            if (result.status === 401)
                logout();
            else {
                showErrorService(result);
            }

        }
    }


    const handleDelete = async () => {

        let result = await fetchService('/deleteuser/' + id, 'DELETE', null);


        if (result.ok) {
            alert('delete success')
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
            <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>EDIT USER</h1>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    {/*TODO: fix UI  */}
                    <div className={styles.editUserForm}>
                        <label>Username: </label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />


                        <label>Password: </label>
                        {isEditPassword ?
                            <div style={{display:'flex', width:'100%'}}>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{width:'70%'}}/>
                                <button onClick={() => setIsEditPassword(false)}>Cancel</button>
                            </div> :
                            <button onClick={() => setIsEditPassword(true)}>Edit password</button>}


                        <label>Role: </label>
                        <select name="role" value={role.toString()} onChange={e => setRole(e.target.value)}
                        disabled={id == localStorage.getItem('id')}>
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
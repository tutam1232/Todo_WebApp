import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import { useNavigate, useParams } from "react-router-dom";
import styles from '../modules/style.module.css'
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

function EditUser() {
    console.log("[EditUser]");
    const logout = useLogout();
    const { id } = useParams();
    const navigate = useNavigate();


    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {

        const getData = async () => {
            let resultUser = await fetchService(`/getuser/${id}`, 'GET', null);
            if (resultUser.ok) {
                let resultUserJSON = await resultUser.json();
                setUsername(resultUserJSON.username);
                setRole(resultUserJSON.role);
            }
            else if(resultUser.status === 401){
                logout();
            }
            else{
                showErrorService(resultUser);
            }
        }

        const getRole = async () => {
            let resultRole = await fetchService('/getroles', 'GET', null);
            if (resultRole.ok) {
                let resultRoleJSON = await resultRole.json();
                setRoles(resultRoleJSON);
            }
            else if(resultRole.status === 401){
                logout();
            }
            else{
                showErrorService(resultRole);
            }
        }

        getData();
        getRole();
    

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //TODO: handle when password is empty + password is not empty

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
        else if(result.status === 401){
            logout();
        }
        else{
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
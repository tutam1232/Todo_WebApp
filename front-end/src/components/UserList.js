import User from "./User";
import useLogout from "../hooks/useLogout.js";
import { useUsers, useUsersDispatch } from "../contexts/UsersContext.js";
import styles from '../modules/style.module.css';
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

import { useEffect } from "react";

function UserList() {

    console.log("[userList]")
    const users = useUsers();
    const dispatch = useUsersDispatch();
    const logout = useLogout();

    useEffect(() => {
        const getData = async () => {
            let result = await fetchService('/getusers', 'GET', null);

            if (result.ok) {
                let resultJSON = await result.json();
                dispatch({
                    type: 'set_users',
                    users: resultJSON
                });
            }
            else if(result.status === 401){
                logout();
            }
            else{
                showErrorService(result);
            }
        }

        getData();
        
    }, [])

    return (
        <div className={styles.tasklist} style={{width:'30vw'}}>
            {users.map((user, i, users) => (
                <div>
                    <User key={user.id} id={user.id} user={user}/>
                    {i+1 != users.length && <hr/>}
                </div>
            ))}
        </div>
    )
}

export default UserList;    
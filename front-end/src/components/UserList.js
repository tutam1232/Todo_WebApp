import User from "./User";
import useLogout from "../hooks/useLogout.js";
import { useUsers, useUsersDispatch } from "../contexts/UsersContext.js";
import styles from '../modules/style.module.css';

import { useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL

function UserList() {

    console.log("[userList]")
    const users = useUsers();
    const dispatch = useUsersDispatch();
    const logout = useLogout();

    const fetchUsers = async function (API_URL) {
        let fetched_user = await fetch(API_URL + '/getusers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })

        if (fetched_user.ok) {
            let fetched_userJSON = await fetched_user.json();
            dispatch({
                type: 'set_users',
                users: fetched_userJSON
            })
            return;
        }
        else {
            if (fetched_user.status === 401)
                logout();
            throw new Error("fetch users failed")
        }
    }

    useEffect(() => {

        fetchUsers(API_URL).then(() => {
            console.log("fetched users")
        }).catch(err => {
            console.log(err)
        })

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
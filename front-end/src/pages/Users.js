import TaskList from "../components/TaskList"
import UserList from "../components/UserList";
import { useEffect } from "react";
import { useTasksDispatch } from "../contexts/TasksContext.js";
import styles from '../modules/style.module.css'
import { useNavigate } from 'react-router-dom'


function Users() {

    console.log("[Users(page)]")
    const dispatch = useTasksDispatch();
    const navigate = useNavigate();
    const loggedRole = localStorage.getItem('role');

    useEffect(() => {
        dispatch({
            type: 'set_tasks',
            tasks: []
        })
    })

    return (
        <div>
            <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>USER LIST</h1>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px' }}>
                <div>
                    <UserList />
                    {loggedRole == 1 && <button className={styles.customButton} style={{ marginTop: '10px' }} onClick={() => {
                        navigate('/user/adduser')
                    }}>Add user</button>}
                </div>
                <TaskList />
            </div>

        </div>
    );
}

export default Users;
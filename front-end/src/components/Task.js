import { useState, memo } from "react";
import { useTasksDispatch } from "../contexts/TasksContext";
import styles from '../modules/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faX, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import useLogout from "../hooks/useLogout";

const API_URL = process.env.REACT_APP_API_URL

const Task = memo(function Task({ task }) {
    console.log("[Task]")
    const [isEditting, setIsEditting] = useState(false);
    const [taskName, setTaskName] = useState(task.name);
    const logout = useLogout();

    const dispatch = useTasksDispatch();

    return (
        <div className={styles.task} style={{ display: "flex" }}>
            <div style={{ width: "80%" }}>
                {isEditting ?
                    <input value={taskName} onChange={(e) => setTaskName(e.target.value)}></input> : //luu y cho nay?
                    < >
                        <span key={task.id}>{taskName}</span>
                        <br />
                        <span style={{fontWeight: 'lighter'}}>user: {task.username}</span>
                    </>}
            </div>

            <div style={{ width: "25%" }}>
                {isEditting ?
                    <button className={styles.button} onClick={async () => {
                        setIsEditting(false);
                        let result = await fetch(API_URL + '/updatetodo/' + task.id, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('accessToken') 
                            },
                            body: JSON.stringify({
                                name: taskName
                            })
                        })

                        if (result.ok) {
                            dispatch({
                                type: 'edit_task',
                                id: task.id,
                                name: taskName
                            });
                        }
                        else {
                            if (result.status === 401)
                                logout();
                            console.log('edit failed')
                        }


                    }}><FontAwesomeIcon icon={faFloppyDisk} /></button> :
                    <button className={styles.button} onClick={() => setIsEditting(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>}


                <button className={styles.button} style={{ marginLeft: "5px" }} onClick={async () => {

                    let result = await fetch(API_URL + '/deletetodo/' + task.id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('accessToken') 
                        }
                    })

                    if (result.ok) {
                        dispatch({
                            type: 'delete_task',
                            id: task.id
                        })
                    }
                    else{
                        if (result.status === 401)
                            logout();
                        console.log('delete failed')
                    }
                    
                }}><FontAwesomeIcon icon={faX} style={{ color: "red" }} /></button>
            </div>
        </div >
    )
})

export default Task;
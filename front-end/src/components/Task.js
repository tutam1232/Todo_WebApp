import { useState, memo } from "react";
import { useTasksDispatch } from "../contexts/TasksContext";
import styles from '../modules/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faX, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import useLogout from "../hooks/useLogout";
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

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
                        let result = await fetchService('/updatetodo/' + task.id, 'PUT', { name: taskName });

                        if (result.ok) {
                            dispatch({
                                type: 'edit_task',
                                id: task.id,
                                name: taskName
                            });
                        }
                        else if (result.status === 401) {
                            logout();
                        }
                        else {
                            showErrorService(result);
                        }


                    }}><FontAwesomeIcon icon={faFloppyDisk} /></button> :
                    <button className={styles.button} onClick={() => setIsEditting(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>}


                <button className={styles.button} style={{ marginLeft: "5px" }} onClick={async () => {

                    let result = await fetchService('/deletetodo/' + task.id, 'DELETE', null);

                    if (result.ok) {
                        dispatch({
                            type: 'delete_task',
                            id: task.id
                        })
                    }
                    else if (result.status === 401) {
                        logout();
                    }
                    else {
                        showErrorService(result);
                    }
                    
                }}><FontAwesomeIcon icon={faX} style={{ color: "red" }} /></button>
            </div>
        </div >
    )
})

export default Task;
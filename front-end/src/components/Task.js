import { useState, memo } from "react";
import { useTasksDispatch } from "../contexts/TasksContext";
import styles from '../modules/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faX, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.REACT_APP_API_URL

const Task = memo(function Task({ task }) {
    console.log("[Task]")
    const [isEditting, setIsEditting] = useState(false);
    const [taskName, setTaskName] = useState(task.name);

    const dispatch = useTasksDispatch();

    return (

        <div className={styles.task} style={{ display: "flex" }}>
            <div style={{ width: "80%" }}>
                {isEditting ?
                    <input value={taskName} onChange={(e) => setTaskName(e.target.value)}></input> : //luu y cho nay?
                    <span key={task.id}>{taskName}</span>}
            </div>

            <div style={{ width: "25%" }}>
                {isEditting ?
                    <button className={styles.button} onClick={async () => {
                        setIsEditting(false);
                        let result = await fetch(API_URL + '/updatetodo/' + task.id, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: taskName
                            })
                        })

                        if (result.ok)
                            dispatch({
                                type: 'edit_task',
                                id: task.id,
                                name: taskName
                            });

                        //TODO: if result not ok?
                    }}><FontAwesomeIcon icon={faFloppyDisk} /></button> :
                    <button className={styles.button} onClick={() => setIsEditting(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>}


                <button className={styles.button} style={{ marginLeft: "5px" }} onClick={async () => {

                    let result = await fetch(API_URL + '/deletetodo/' + task.id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (result.ok)
                        dispatch({
                            type: 'delete_task',
                            id: task.id
                        })
                }}><FontAwesomeIcon icon={faX} style={{ color: "red" }} /></button>
            </div>
        </div >
    )
})

export default Task;
import { useState } from "react";
import { useTasksDispatch, useTasks } from "../contexts/TasksContext";
import styles from '../modules/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.REACT_APP_API_URL

function AddTask() {
    console.log("[addTask]")
    const [text, setText] = useState('');

    const dispatch = useTasksDispatch();
    const tasks = useTasks()

    return (
        <div>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} className={styles.input} />
            <button className={styles.addtask} onClick={async () => {
                let result = await fetch(API_URL + '/addtodo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: tasks.length + 1,
                        name: text
                    })
                })
                if (result.ok)
                    dispatch({
                        type: 'add_task',
                        id: tasks.length + 1,
                        name: text
                    });
                setText('');
            }}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    )
}

export default AddTask;
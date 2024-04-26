import { useState, memo } from "react";
import { useTasksDispatch } from "../contexts/TasksContext";
import styles from '../modules/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const API_URL = process.env.REACT_APP_API_URL

const AddTask = memo(function AddTask() {
    console.log("[addTask]")
    const [text, setText] = useState('');

    const dispatch = useTasksDispatch();

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
                        name: text
                    })
                })
                if (result.ok) {
                    let resultJSON = await result.json();
                    dispatch({
                        type: 'add_task',
                        id: resultJSON.id,
                        name: text
                    });
                    setText('');
                }
                else{
                    console.log('add task failed')
                }
            }}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    )
});

export default AddTask;
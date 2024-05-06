import { useState, memo } from "react";
import { useTasksDispatch } from "../contexts/TasksContext";
import styles from '../modules/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useLogout from "../hooks/useLogout";

const API_URL = process.env.REACT_APP_API_URL

const AddTask = memo(function AddTask() {
    console.log("[addTask]")
    const [text, setText] = useState('');
    const logout = useLogout();

    const dispatch = useTasksDispatch();

    return (
        <div>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} className={styles.input} />
            <button className={styles.addtask} onClick={async () => {
                let result = await fetch(API_URL + '/addtodo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                    },
                    body: JSON.stringify({
                        name: text,
                        uid: localStorage.getItem('id')
                    })
                })
                if (result.ok) {
                    let resultJSON = await result.json();
                    console.log(resultJSON.id)
                    dispatch({
                        type: 'add_task',
                        id: resultJSON.id,
                        name: text,
                        username: resultJSON.username
                    });
                    setText('');
                }
                else{
                    console.log('add task failed')
                    if (result.status === 401) 
                        logout();
                    
                }
            }}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    )
});

export default AddTask;
import { useState, memo } from "react";
import { useTasksDispatch } from "../contexts/TasksContext";
import styles from '../modules/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useLogout from "../hooks/useLogout";
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

const AddTask = memo(function AddTask() {
    console.log("[addTask]")
    const [text, setText] = useState('');
    const logout = useLogout();

    const dispatch = useTasksDispatch();

    return (
        <div>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} className={styles.input} />
            <button className={styles.addtask} onClick={async () => {
                let result = await fetchService('/addtodo', 'POST', {
                    name: text,
                    uid: localStorage.getItem('id')
                })
                if (result.ok) {
                    let resultJSON = await result.json();
                    dispatch({
                        type: 'add_task',
                        id: resultJSON.id,
                        name: text,
                        username: resultJSON.username
                    });
                    setText('');
                }
                else if(result.status === 401){
                    logout();
                }
                else{
                    showErrorService(result);
                }
            }}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    )
});

export default AddTask;
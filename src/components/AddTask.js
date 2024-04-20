import { useState } from "react";
import { useTasksDispatch } from "../contexts/TasksContext";
import styles from '../modules/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from "@fortawesome/free-solid-svg-icons";

let nextId = 3;

function AddTask(){
    const [text, setText] = useState('');
    let dispatch = useTasksDispatch();

    return(
        <div>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text} className={styles.input}/>
            <button className={styles.addtask} onClick={() => {
                
                dispatch({
                    type: 'add_task',
                    id: nextId++,
                    name: text
                });
                setText('');
            }}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    )
}

export default AddTask;
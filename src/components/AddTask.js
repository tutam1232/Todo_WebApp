import { useState } from "react";
import { useContext } from "react";
import { TasksDispatcherContext } from "../contexts/TasksContext";

let nextId = 3;

function AddTask(){
    const [text, setText] = useState('');
    let dispatch = useContext(TasksDispatcherContext)

    return(
        <>
            <input type="text" onChange={(e) => setText(e.target.value)} value={text}/>
            <button onClick={() => {
                
                dispatch({
                    type: 'add_task',
                    id: nextId++,
                    name: text
                });
                setText('');
            }}>Add Task</button>
        </>
    )
}

export default AddTask;
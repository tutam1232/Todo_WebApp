import { useState } from "react";
import { useTasksDispatch } from "../contexts/TasksContext";


function Task({ task }) {
    const [isEditting, setIsEditting] = useState(false);
    const [taskName, setTaskName] = useState(task.name);

    const dispatch = useTasksDispatch();

    return (
        <div>
            {isEditting ?
                <input value={taskName} onChange={(e) => setTaskName(e.target.value)}></input> : //luu y cho nay?
                <span key={task.id}>{taskName}</span>}

            {isEditting ?
                <button onClick={() => {
                    setIsEditting(false);
                    dispatch({
                        type: 'edit_task',
                        id: task.id,
                        name: taskName
                    });
                }}>Save</button> :
                <button onClick={() => setIsEditting(true)}>Edit</button>}


            <button onClick={() => dispatch({
                type: 'delete_task',
                id: task.id
            })}>Delete</button>
        </div>
    )
}

export default Task;
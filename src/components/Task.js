import { useState } from "react";

function Task({task, onEditTask, onDeleteTask}){
    const [isEditting, setIsEditting] = useState(false);
    const [taskName, setTaskName] = useState(task.name);

    return(
        <div>
            {isEditting ? 
                <input value={taskName}  onChange={(e) => setTaskName(e.target.value)}></input>: //luu y cho nay?
                <span key={task.id}>{taskName}</span>}
            
            {isEditting ? 
            <button onClick={() => {
                setIsEditting(false);
                onEditTask(task.id, taskName)
                }}>Save</button>:
            <button onClick={() => setIsEditting(true)}>Edit</button>}
            

            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
    )
}

export default Task;
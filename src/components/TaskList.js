import { useContext } from "react";
import Task from "./Task.js"
import { TasksContext } from "../contexts/TasksContext.js";

function TaskList(){
    
    const tasks = useContext(TasksContext)

    return(
        tasks.map(task => (
            <Task task={task} key={task.id}/>
        ))
    )

}

export default TaskList;
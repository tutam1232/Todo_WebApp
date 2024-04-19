import Task from "./Task.js"
import { useTasks } from "../contexts/TasksContext.js";

function TaskList(){
    
    const tasks = useTasks();

    return(
        tasks.map(task => (
            <Task task={task} key={task.id}/>
        ))
    )

}

export default TaskList;
import Task from "./Task.js"
import { useTasks } from "../contexts/TasksContext.js";
import styles from '../modules/style.module.css';

function TaskList(){
    
    const tasks = useTasks();

    return(
        <div  className={styles.tasklist}>
            {tasks.map(task => (
                <Task task={task} key={task.id}/>
            ))}
        </div>
    )

}

export default TaskList;
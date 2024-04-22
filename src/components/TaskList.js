import Task from "./Task.js"
import { useTasks } from "../contexts/TasksContext.js";
import styles from '../modules/style.module.css';
import { Draggable } from "react-beautiful-dnd";

function TaskList() {
    const tasks = useTasks();

    return (
        <div className={styles.tasklist} style={{width:"30vw"}}>
            {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={(task.id).toString()} index={index}>
                    {(provided) => (
                        <div  ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                            <Task task={task} key={task.id} />
                        </div>
                    )}
                </Draggable>
            ))}
        </div>
    )

}

export default TaskList;
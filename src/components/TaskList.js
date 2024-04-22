import Task from "./Task.js"
import { useTasks, useTasksDispatch } from "../contexts/TasksContext.js";
import styles from '../modules/style.module.css';
import { Draggable } from "react-beautiful-dnd";
import { useEffect,useMemo } from "react";

const API_URL = "https://662674f6052332d55322eed8.mockapi.io/gettodo"

function TaskList() {

    const dispatch = useTasksDispatch();
    const tasks = useTasks();
    

    const fetchTasks = async function(API_URL){
        let tasks_fetched = await fetch(API_URL).then(res => res.json()).catch(err => console.log(err));
        dispatch({
            type: 'set_tasks',
            tasks: tasks_fetched
        })
    }

    useEffect(() => {

        fetchTasks(API_URL);
        console.log("fetched")

    },[])

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
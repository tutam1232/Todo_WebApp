import Task from "./Task.js"
import { useTasks, useTasksDispatch } from "../contexts/TasksContext.js";
import styles from '../modules/style.module.css';
import { Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL

function TaskList() {

    console.log("[taskList]")
    const dispatch = useTasksDispatch();
    const tasks = useTasks();
    

    const fetchTodos = async function (API_URL) {
        //fetch with method get
        let fetched_todo = await fetch(API_URL + '/gettodos',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })    

        let fetched_todoJSON = await fetched_todo.json();

        if(fetched_todo.ok){
            dispatch({
                type: 'set_tasks',
                tasks: fetched_todoJSON
            })
        }

        //TODO: fix if fetched_todo not ok
    }

    useEffect(() => {

        fetchTodos(API_URL);
        console.log("fetched tasks")

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
import Task from "./Task.js"
import { useTasks, useTasksDispatch } from "../contexts/TasksContext.js";
import styles from '../modules/style.module.css';
import { Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import useLogout from "../hooks/useLogout.js";

const API_URL = process.env.REACT_APP_API_URL

function TaskList() {

    console.log("[taskList]")
    const dispatch = useTasksDispatch();
    const tasks = useTasks();
    const logout = useLogout();
    

    const fetchTodos = async function (API_URL) {
        let fetched_todo = await fetch(API_URL + '/gettodos',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken') 
            }
        })    
        

        if(fetched_todo.ok){
            let fetched_todoJSON = await fetched_todo.json();
            dispatch({
                type: 'set_tasks',
                tasks: fetched_todoJSON
            })

            return;
        }
        else{
            console.log('logout')
            if(fetched_todo.status === 401)
                logout();
            throw new Error("fetch tasks failed")
        }

    }

    useEffect(() => {

        fetchTodos(API_URL).then(() => {
            console.log("fetched tasks")
        }).catch(err => {
            console.log(err)
        })
        

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
import { useState } from "react";
import Task from "./Task.js"

function TaskList({tasks, onEditTask, onDeleteTask}){
    
    return(
        tasks.map(task => (
            <Task  task={task} key={task.id} onEditTask={onEditTask} onDeleteTask={onDeleteTask}/>
        ))
    )

}

export default TaskList;
import React from "react";
import { useState, useReducer } from "react";

function App() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleAddTask(text) {
        dispatch({
            type: 'add_task',
            name: text,
            id: nextId++,
        })
    }

    function handleChangeTask(id,text) {
        dispatch({
            type: 'change_task',
            name: text,
            id: id,
        })
    }

    function handleDeleteTask(id) {
        dispatch({
            type: 'delete_task',
            id: id,
        })
    }

    return (
        <>
            <h1>Todo List</h1>
            <AddTask onAddTask={handleAddTask} />
            <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
        </>
    
    );
}


function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'add_task':
            return [...tasks, { id: action.id, text: action.text }];
        case 'change_task':
            return tasks.map((task) => {
                if (task.id === action.id) {
                    return { ...task, text: action.text };
                } else {
                    return task;
                }
            });
        case 'delete_task':
            return tasks.filter((task) => task.id !== action.id);
        default:
            return tasks;
    }
}

const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
];
let nextId = 3;

export default App;
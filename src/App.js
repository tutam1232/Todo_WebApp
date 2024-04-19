import TaskList from "./components/TaskList.js"
import AddTask from "./components/AddTask.js"
import { TasksContext, TasksDispatcherContext } from './contexts/TasksContext.js';

import { useReducer } from "react";

function App() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);


    return (
        <>
            <h1>Todo List</h1>
            <TasksContext.Provider value={tasks}>
                <TasksDispatcherContext.Provider value={dispatch}>

                    <AddTask />
                    <TaskList />

                </TasksDispatcherContext.Provider>
            </TasksContext.Provider>
        </>
    );
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'add_task': {
            return [...tasks, { id: action.id, name: action.name }]
        }
        case 'delete_task': {
            return tasks.filter(task => task.id != action.id)
        }
        case 'edit_task': {
            return tasks.map(task => {
                if (task.id == action.id){
                    return { ...task, name: action.name };
                }
                else{
                    return task
                }
            })
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


const initialTasks = [
    { id: 0, name: 'Philosopher’s Path' },
    { id: 1, name: 'Visit the temple' },
    { id: 2, name: 'Drink matcha' }
];

export default App;
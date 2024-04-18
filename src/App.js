import TaskList from "./components/TaskList.js"
import AddTask from "./components/AddTask.js"
import { useReducer } from "react";

function App() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleAddTask(text) {
        dispatch({
            type: 'add_task',
            id: nextId++,
            name: text
        });
    }

    function handleDeleteTask(id) {
        dispatch({
            type: 'delete_task',
            id: id++
        });
    }

    function handleEditTask(id, text) {
        dispatch({
            type: 'edit_task',
            id: id,
            name: text
        });
    }

    return (
        <>
            <h1>Todo List</h1>
            <AddTask onAddTask={handleAddTask} />
            <TaskList tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
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


let nextId = 3;
const initialTasks = [
    { id: 0, name: 'Philosopher’s Path' },
    { id: 1, name: 'Visit the temple' },
    { id: 2, name: 'Drink matcha' }
];

export default App;
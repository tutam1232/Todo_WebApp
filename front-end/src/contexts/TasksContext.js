import { createContext, useContext, useReducer,useCallback } from "react";

const TasksContext = createContext([]);
const TasksDispatcherContext = createContext(null);

function TasksProvider({ children }) {
    const tasksReducer = useCallback((tasks, action) => {
        console.log("reducer")
        switch (action.type) {
            case 'add_task': {
                return [...tasks, { id: action.id, name: action.name }]
            }
            case 'delete_task': {
                return tasks.filter(task => task.id != action.id)
            }
            case 'edit_task': {
                return tasks.map(task => {
                    if (task.id == action.id) {
                        return { ...task, name: action.name };
                    }
                    else {
                        return task
                    }
                })
            }
            case 'reorder_task': {
                let newTasks = Array.from(tasks)
                const draggedTask = newTasks[action.dragIndex]
                newTasks.splice(action.dragIndex, 1)
                newTasks.splice(action.dropIndex, 0, draggedTask)
                return newTasks
            }
            case 'set_tasks':{
                return action.tasks
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    },[])

    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatcherContext.Provider value={dispatch}>

                {children}

            </TasksDispatcherContext.Provider>
        </TasksContext.Provider>
    )
}

function useTasks() {
    console.log("useTasks")
    return useContext(TasksContext);
}

function useTasksDispatch() {
    console.log("useTasksDispatch")
    return useContext(TasksDispatcherContext);
}

export { TasksProvider, useTasks, useTasksDispatch};



const initialTasks = [
    // { id: 0, name: 'Philosopher’s Path' },
    // { id: 1, name: 'Visit the temple' },
    // { id: 2, name: 'Drink matcha' }
];

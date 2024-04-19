import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext([]);
const TasksDispatcherContext = createContext(null);

function TasksProvider({ children }) {
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
    return useContext(TasksContext);
}

function useTasksDispatch() {
    return useContext(TasksDispatcherContext);
}

export { TasksProvider, useTasks, useTasksDispatch};

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
                if (task.id == action.id) {
                    return { ...task, name: action.name };
                }
                else {
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

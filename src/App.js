import TaskList from "./components/TaskList.js"
import AddTask from "./components/AddTask.js"
import { TasksProvider } from "./contexts/TasksContext.js";

function App() {   

    return (
        <>
            <h1>Todo List</h1>
            <TasksProvider>
                <AddTask/>
                <TaskList/>
            </TasksProvider>
        </>
    );

}





export default App;
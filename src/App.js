import TaskList from "./components/TaskList.js"
import AddTask from "./components/AddTask.js"
import { TasksProvider } from "./contexts/TasksContext.js";


function App() {   

    return (
        <>
            <h1 style={{textAlign: "center", color:"white",marginTop:"5%"}}>TODO LIST</h1>
            <TasksProvider>
                <div style={{width:"100%", display:"flex",justifyContent:"center"}}><AddTask/></div>
                <div style={{width:"100%", display:"flex",justifyContent:"center"}}><TaskList/></div>
            </TasksProvider>
        </>
    );

}





export default App;
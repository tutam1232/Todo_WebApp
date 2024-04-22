import TaskList from "./components/TaskList.js"
import AddTask from "./components/AddTask.js"
import { useTasksDispatch } from "./contexts/TasksContext.js";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';


function App() {

    
    let dispatch = useTasksDispatch();
    
    function handleOnDragEnd(result) {

        if (!result.destination) return;
        dispatch({
            type: 'reorder_task',
            dragIndex: result.source.index,
            dropIndex: result.destination.index
        })
       
    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "white", marginTop: "5%" }}>TODO LIST</h1>
            
                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><AddTask /></div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Droppable droppableId="tasks">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} >
                                    <TaskList />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                </DragDropContext>
        </>
    );

}


//reference drag n drop: https://medium.com/codex/how-to-implement-a-simple-drag-and-drop-using-create-react-app-and-react-beautiful-dnd-4e6e57a2299f


export default App;
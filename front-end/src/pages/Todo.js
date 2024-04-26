import TaskList from "../components/TaskList.js"
import AddTask from "../components/AddTask.js"
import { useTasksDispatch, useTasks } from "../contexts/TasksContext.js";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
const API_URL = process.env.REACT_APP_API_URL

function Todo() {

    console.log("[Todo]")

    let dispatch = useTasksDispatch();
    let tasks = useTasks()

    async function handleOnDragEnd(result) {

        if (!result.destination) return;

        const draggedTask = tasks[result.source.index]
        const previousDropTask = tasks[result.destination.index]
        const dragIdDatabase = draggedTask.id;
        const dropIdDatabase = previousDropTask.id;


        dispatch({
            type: 'reorder_task',
            dragIndex: result.source.index,
            dropIndex: result.destination.index
        })

        let resultFetch = await fetch(API_URL + '/reorder' + `/${dragIdDatabase}` + `/${dropIdDatabase}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (!resultFetch.ok) {
            dispatch({
                type: 'reorder_task',
                dragIndex: result.source.index,
                dropIndex: result.destination.index
            })

            console.log('reorder fail')
        }


    }

    return (
        <>
            <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>TODO LIST</h1>

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


export default Todo;
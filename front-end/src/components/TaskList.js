import Task from "./Task.js"
import styles from '../modules/style.module.css';
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { useTasks, useTasksDispatch } from "../contexts/TasksContext.js";
import useLogout from "../hooks/useLogout.js";
import fetchService from "../services/fetchService.js";
import showErrorService from "../services/showErrorService.js";


function TaskList() {

    console.log("[taskList]")
    const dispatch = useTasksDispatch();
    const tasks = useTasks();
    const logout = useLogout();


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

        let resultFetch = await fetchService(`/reorder/${dragIdDatabase}/${dropIdDatabase}`, 'PUT', null);
        if (!resultFetch.ok) {

            dispatch({
                type: 'reorder_task',
                dragIndex: result.source.index,
                dropIndex: result.destination.index
            })
            if (resultFetch.status === 401)
                logout();
            else{
                showErrorService(resultFetch);
            }
        }


    }



    return (

        <DragDropContext onDragEnd={handleOnDragEnd}>

            <Droppable droppableId="tasks">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps} >
                        <div className={styles.tasklist} style={{ width: "30vw" }}>
                            {tasks.map((task, index) => (
                                <Draggable key={task.id} draggableId={(task.id).toString()} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                                            <Task task={task} key={task.id} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>


        </DragDropContext>

    )

}

export default TaskList;
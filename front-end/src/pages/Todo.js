import TaskList from "../components/TaskList.js"
import AddTask from "../components/AddTask.js"
import { useTasksDispatch } from "../contexts/TasksContext.js";
import { useEffect } from "react";
import useLogout from "../hooks/useLogout.js";

import fetchService from "../services/fetchService.js";
import showErrorService from "../services/showErrorService.js";



function Todo() {

    console.log("[Todo]")
    const dispatch = useTasksDispatch();
    const logout = useLogout();    

    useEffect(() => {

        const getData = async () => {
            const res = await fetchService('/gettodos', 'GET', null)
            if (res.ok) {
                const data = await res.json()
                dispatch({
                    type: 'set_tasks',
                    tasks: data
                })
            }
            else if (res.status === 401)
                logout();
            else
                showErrorService(res)
        }

        getData()


    }, [])


    return (
        <>
            <h1 style={{ textAlign: "center", color: "white", marginTop: "2%" }}>TODO LIST</h1>

            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}><AddTask /></div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <TaskList />
            </div>
        </>
    );

}


//reference drag n drop: https://medium.com/codex/how-to-implement-a-simple-drag-and-drop-using-create-react-app-and-react-beautiful-dnd-4e6e57a2299f


export default Todo;
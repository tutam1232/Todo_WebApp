import TaskList from "../components/TaskList.js"
import AddTask from "../components/AddTask.js"
import { useTasksDispatch } from "../contexts/TasksContext.js";
import { useEffect } from "react";
import useLogout from "../hooks/useLogout.js";

const API_URL = process.env.REACT_APP_API_URL


function Todo() {

    console.log("[Todo]")
    const dispatch = useTasksDispatch();
    const logout = useLogout();

    const fetchTodos = async function (API_URL) {
        let fetched_todo = await fetch(API_URL + '/gettodos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })


        if (fetched_todo.ok) {
            let fetched_todoJSON = await fetched_todo.json();
            dispatch({
                type: 'set_tasks',
                tasks: fetched_todoJSON
            })

            return;
        }
        else {

            if (fetched_todo.status === 401)
                logout();
            throw new Error("fetch tasks failed")
        }

    }

    useEffect(() => {

        fetchTodos(API_URL).then(() => {
            console.log("fetched tasks")
        }).catch(err => {
            console.log(err)
        })


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
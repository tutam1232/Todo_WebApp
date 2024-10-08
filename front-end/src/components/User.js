import { memo } from "react";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { useTasksDispatch } from "../contexts/TasksContext";
import fetchService from "../services/fetchService";
import showErrorService from "../services/showErrorService";

const User = memo(function User({ user }) {
    console.log("[User]")

    const loggedRole = localStorage.getItem('role');
    const logout = useLogout();
    const dispatch = useTasksDispatch();

    return (
        <div style={{ padding: '10px' }}>

            <div style={{ textAlign: 'center', color: 'white' }}>
                <span>username: {user.username}</span>
                <br />
                <span>role: {user.role}</span>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center', columnGap: '5px' }}>
                {loggedRole == 1 &&
                    <button>
                        <Link to={`/user/${user.id}`}>
                            edit
                        </Link>
                    </button>
                }

                <button onClick={async () => {

                    let result = await fetchService(`/gettodos/${user.id}`, 'GET', null);

                    if (result.ok) {
                        let fetched_resultJSON = await result.json();
                
                        dispatch({
                            type: 'set_tasks',
                            tasks: fetched_resultJSON
                        })
                    }
                    else if (result.status === 401) {
                        logout();
                    }
                    else {
                        showErrorService(result);
                    }
                }}>
                    view tasks
                </button>

            </div>



        </div>
    )

})

export default User;
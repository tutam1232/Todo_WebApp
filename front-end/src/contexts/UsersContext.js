import { createContext, useContext, useReducer, useCallback } from "react";

const UsersContext = createContext([]);
const UsersDispatcherContext = createContext(null);

function UsersProvider({ children }) {
    const usersReducer = useCallback((users, action) => {
        console.log("[users reducer]")
        switch (action.type) {
            case 'set_users': {
                return action.users
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }, [])

    const [users, dispatch] = useReducer(usersReducer, initialUsers);

    return (
        <UsersContext.Provider value={users}>
            <UsersDispatcherContext.Provider value={dispatch}>
                {children}
            </UsersDispatcherContext.Provider>
        </UsersContext.Provider>
    )
}

function useUsers() {
    console.log("useUsers")
    return useContext(UsersContext);
}

function useUsersDispatch() {
    console.log("useUsersDispatch")
    return useContext(UsersDispatcherContext);
}

export { UsersProvider, useUsers, useUsersDispatch };


const initialUsers = [];
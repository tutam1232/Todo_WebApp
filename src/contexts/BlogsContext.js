import { createContext, useContext, useReducer,useCallback } from "react";

const BlogsContext = createContext([]);
const BlogsDispatcherContext = createContext(null);

function BlogsProvider({ children }) {
    const blogsReducer = useCallback((blogs, action) => {
        console.log("reducer blog")
        switch (action.type) {            
            case 'set_blogs':{
                return action.blogs
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    },[])

    const [blogs, dispatch] = useReducer(blogsReducer, initialBlogs);

    return (
        <BlogsContext.Provider value={blogs}>
            <BlogsDispatcherContext.Provider value={dispatch}>

                {children}

            </BlogsDispatcherContext.Provider>
        </BlogsContext.Provider>
    )
}

function useBlogs() {
    console.log("useBlogs")
    return useContext(BlogsContext);
}

function useBlogsDispatch() {
    console.log("useBlogsDispatch")
    return useContext(BlogsDispatcherContext);
}

export { BlogsProvider, useBlogs, useBlogsDispatch};


const initialBlogs=[]

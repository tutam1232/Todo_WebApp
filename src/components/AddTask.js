import { useState } from "react";

function AddTask({onAddTask}){
    const [text, setText] = useState('');

    return(
        <>
            <input type="text" onChange={(e) => setText(e.target.value)} />
            <button onClick={() => {
                setText('');
                onAddTask(text)
            }}>Add Task</button>
        </>
    )
}

export default AddTask;
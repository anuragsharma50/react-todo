import {useEffect, useState} from "react";

export const InputContainer = ({addTodo,update,setUpdate,updateTodo}) => {

    const [todo,setTodo] = useState({title:"",id:null,completed:false,userId:1})

    // setting todo to todo we want to update if there is any.
    useEffect(() => {
        if(update){
            setTodo(update);
        }
    },[update])

    // either update or add todo based on update element
    const handleTodo = () => {
        if(update) {
            updateTodo(todo);
        }
        else{
            addTodo(todo)
        }
        setTodo({title:"",id:null,completed:false,userId:1});
    }


    // cnacel update, show blank input box and make it back to add new todo
    const cancelUpdate = () => {
        setUpdate(null);
        setTodo({title:"",id:null,completed:false,userId:1});
    }

    return (
        <div className="input-container">
            {/* Input field to enter todo to add or updated */}
            <input className="input-box" type="text" value={todo.title} onChange={e => setTodo({...todo,title:e.target.value})} />
            {/* Button to add or update */}
            <button className="btn" onClick={handleTodo}>{update ? "Update" : "Add Todo"  }</button>
            {   
                // cancel updated, show only when we want to update todo.
                update && <button className="btn" onClick={cancelUpdate}>Cancel</button>
            }
        </div>
    )

}

export const Todo = ({todo,deleteTodo,setUpdate}) => {

    return (
        <div className="todo">
            {/* Show todo as checked or unchecked based on it's state */}
            {
               todo?.completed ? <input type="checkbox" class="check-box" defaultChecked/> : <input class="check-box" type="checkbox" />
            }
            {/* To show todo title/text */}
            <label>{todo?.title}</label>
            {/* Buttons to edit or delete todo */}
            <div className="edit" onClick={() => setUpdate(todo)}>
                <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <i class="fa-solid fa-xmark" id="delete" onClick={() => deleteTodo(todo.id)} style={{color: "#ffffff"}}></i>
        </div>
    )
    
}
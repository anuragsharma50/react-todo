import { useEffect, useReducer, useState } from 'react';
import axios from "axios";
import './App.css';
import { InputContainer } from './Components/InputContainer';
import { Todo } from './Components/Todo';

const reducer = (state,action) => {
  switch(action.type){
    case "SET_TODOS":
      // setting state to all todos, using on first API call for fetching inital todos
      return [...action.todos];
    case "ADD_TODO": 
      // keep all todos same, add new at the end
      return [...state, action.todo];
    case "UPDATE_TODO":
      // check todo with same id and update it, map return array of todos 
      return state.map((todo) => {
        if(todo.id === action.todo.id) {
          todo = action.todo;
        }
        return todo;
      })
    case "DELETE_TODO":
      // check todo with same id and filer it out and return all remaining todos
      return state.filter((todo) => todo.id !== action.todoId);
    default:
      return state;
  }
}

function App() {

  // reducer to state todos
  const [todos,dispatch] = useReducer(reducer,[]);
  // update to keep todo to update, if not null buttons will show update and value will be there
  const [update,setUpdate] = useState(null);

  // for fetching todos on start and adding it to todos state. getting only for userid 1
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1");
      const todos = await res.json();
      // console.log(todos);  
      dispatch({type:"SET_TODOS",todos})
    }

    fetchTodos();

  },[])

  // add a new todo to state and API, calling from InputContainer component
  // checking trim also for not adding blank todo
  const addTodo = async (todo) => {
    if(todo.title.trim() === ""){
      return;
    }
    try{
      const res = await axios.post("https://jsonplaceholder.typicode.com/todos?userId=1",todo);
      // console.log(res.data);
      dispatch({type:"ADD_TODO",todo:res.data});
    }
    catch(err) {
      console.log(err);
    }
  }

  // delete a todo from state and API, calling from Todo component
  const deleteTodo = async (todoId) => {
    try{
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
      // console.log(res.data);
      dispatch({type:"DELETE_TODO",todoId});
    }
    catch(err){
      console.log(err);
    }
  }

  // update todo to API and state, calling from InputContainer component
  const updateTodo = async (todo) => {
    if(todo.title.trim() === ""){
      return;
    }
    try{
      const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,todo);
      // console.log(res.data);
      dispatch({type:"UPDATE_TODO",todo:res.data});
      setUpdate(null);
    }
    catch(err) {
      console.log(err);
    }
  }
  
  return (
    <div className="App">
      {/* For input adding and updating */}
      <InputContainer addTodo={addTodo} updateTodo={updateTodo} update={update} setUpdate={setUpdate} />
      {
        // mapping todos to Todo component
        todos.map(todo => {
          return (
            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} setUpdate={setUpdate} />
          )
        })
      }
    </div>
  );
}

export default App;

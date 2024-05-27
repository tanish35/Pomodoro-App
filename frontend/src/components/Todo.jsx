import React from 'react'
import { useState } from "react"

function generateId(){
  return Math.floor(Math.random()*100)
}

const Todo = () =>{
    const [todos,setTodos] = useState([]);
    const[input,setInput] = useState("");
    const handleSubmit= ()=>{
      setTodos(todos=>
        todos.concat({
          text:input,
          id:generateId()
        })
      )
      setInput("");
    }

    const removeTodo = (id)=>{
      setTodos((todos)=>todos.filter((t)=>t.id !== id));
    }
  return <>
  <div className="container">
    <input className='text-black text-xl font-bold rounded-lg p-2 text-center' type="text" value={input} 
   onChange={(e)=>setInput(e.target.value)} placeholder="Add task" />
   <button className='font-bold text-2xl' onClick={handleSubmit}>+</button>
   <ul className="todos-list">
    {
      todos.map(({text,id})=>{
        return <li key={id} className="todo">
          <span>{text} </span>

          <button className="close" onClick={()=>removeTodo(id)}>X</button>
        </li>
      })
    }
   </ul>
  </div>
  </>
}

export default Todo;
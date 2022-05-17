import React, { useEffect, useId, useState } from "react";
import axios from "axios";

function Todo() {
  const [input, setInput] = useState();
  const [random] = useState(useId());
  const [todoList, setTodoList] = useState([]);

  const fetchData = async () => {
    //const response = await fetch("http://localhost:3000/todoList");
    //const data = await response.json();
    const response = await axios.get(`http://localhost:3000/todoList`);
    setTodoList(response.data);
  };
  useEffect(() => fetchData(), []);
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/todoList/${id}`);
    fetchData();
    // const filteredTodo = todoList.filter((todo) => todo.id !== id);
    // setTodoList(filteredTodo);
  };
  const handleUpdate = async (index) => {
    const updatedTask = prompt("Update your task ", todoList[index].task);
    await axios.put(`http://localhost:3000/todoList/${todoList[index].id}`, {
      id: todoList[index].id,
      task: updatedTask,
    });
    fetchData();
    // let copiedtodoList = [...todoList];
    // copiedtodoList[index].task = updatedTask;
    // setTodoList(copiedtodoList);
  };
  const addTodo = async () => {
    await axios.post(`http://localhost:3000/todoList`, {
      id: random,
      task: input,
    });
    fetchData();
    // setTodoList([...todoList, { id: random, task: input }]);
    setInput("");
  };

  return (
    <div>
      <h1>Todo Application</h1>
      <label>Task</label>
      <input type="text" value={input} onChange={handleChange} />
      <button onClick={addTodo}>Add Todo</button>
      {todoList.map((todo, index) => (
        <div class="d-flex">
          <p key={todo.id}>{todo.task}</p>
          <button onClick={() => handleDelete(todo.id)}>X</button>
          <button onClick={() => handleUpdate(index)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default Todo;

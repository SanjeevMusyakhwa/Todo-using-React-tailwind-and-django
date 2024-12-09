import React, { useState, useEffect } from "react";
import axios from 'axios';

import todo from '../assets/todo.png';
import Todoitems from "./Todoitems";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Fetch existing tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/todos/');
        setTasks(response.data);  // Update state with fetched tasks
      } catch (error) {
        console.log("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    try {
      if (inputValue.trim() !== '') {
        const response = await axios.post('http://localhost:8000/api/todos/add/', {
          title: inputValue,
          completed: false
        });
        setTasks([...tasks, response.data]);  // Add the new task to the tasks list
        setInputValue('');  // Clear the input field
      }
    } catch (error) {
      console.log("Error adding task", error);
    }
  };

  return (
    <>
      {/* title */}
      <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[450px] rounded-xl mt-5">
        <div className="flex items-center gap-2">
          <img src={todo} alt="Todo" className="w-7" />
          <h1 className="text-3xl font-extrabold font-mono">Todo List</h1>
        </div>
        <hr className="mt-3" />

        <div className="flex items-center my-7 bg-gray-600 rounded-full">
          <input
            type="text"
            placeholder="Add Todo"
            name="title"
            id="title"
            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-400"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-green-700 h-14 border-none rounded-full w-32 items-end text-white font-bold font-mono cursor-pointer"
          >
            Add +
          </button>
        </div>

        <hr className="mb-3" />

        <div>
          {/* Pass tasks as props to Todoitems */}
          <Todoitems tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
}

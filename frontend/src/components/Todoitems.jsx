import React, { useState, useEffect } from "react";
import axios from 'axios';
import tick from '../assets/tick.png';
import remove from '../assets/delete.jpg';

export default function Todoitems() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/todos/');
        setTasks(response.data); // Update state with fetched tasks
      } catch (error) {
        console.log("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, []);

  // Mark a task as completed
  const handleCompletion = async (id) => {
    try {
      // Toggle task completion in the state
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);

      // Optionally update the backend if needed
      await axios.patch(`http://localhost:8000/api/todos/${id}/`, {
        completed: updatedTasks.find(task => task.id === id).completed
      });
    } catch (error) {
      console.log("Error updating task completion:", error);
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      // Making the DELETE request to the backend
      const response = await axios.delete(`http://localhost:8000/api/todos/delete/${id}/`);
      console.log('Delete response:', response);  // Debugging the response
  
      // After deleting, update the state to remove the task from the list
      setTasks(tasks.filter(task => task.id !== id)); // Filter out the deleted task
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center">
              <img 
                src={tick} 
                alt="Tick" 
                className={`w-6 cursor-pointer ${task.completed ? 'opacity-50' : ''}`} 
                onClick={() => handleCompletion(task.id)} // Toggling task completion
              />
              <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.title}
              </span>
            </div>
            <img 
              src={remove} 
              alt="Delete" 
              className="w-6 cursor-pointer" 
              onClick={() => handleDelete(task.id)} // Deleting task
            />
          </div>
        ))}
      </div>
    </>
  );
}

import React from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
export default function App() {
  return (
    <>
      <div className="bg-stone-700 grid min-h-screen">
        <div>
          <Navbar />
        </div>
        <div>
        <Todo />
        </div>
      </div>
    </>
  )
}
import React, {useState, useEffect} from "react"
import axios from 'axios'
import tick from '../assets/tick.png'
import remove from '../assets/delete.jpg'
export default function Todoitems() {



  return (
    <>
    <div className="flex items-center my-3 gap-2 w=">
      <div className="flex flex-1 items-center cursor-pointer">
        <img src={tick} alt="" className="w-6"/>
        <p className="ml-2 text-slate-700 text-[15px]">This is Todo</p>
      </div>
      <img src={remove} alt="" className="w-6 cursor-pointer" />
     
    </div>
    </>
  )
}
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {  
  return (
    <header className='px-5 py-[8px] flex items-center justify-between bg-white shadow-md fixed left-0 right-0 top-0'>
      <Link to='/'>
        <h1 className='text-xl font-[500] text-[#2e7d32]'>LitFlix</h1>
      </Link>
      <div>
        <ul className='flex justify-center items-center'>
          <Link to='/'>
            <li 
              id="home" 
              className="hover:bg-slate-100 px-[6px] py-3 rounded-t-lg"
            >
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li 
              id="about" 
              className="hover:bg-slate-100 px-[6px] py-3 rounded-t-lg"
            >
              About
            </li>
          </Link>
          <Link to='/employee-login'>
            <li 
              id="employee" 
              className="hover:bg-slate-100 px-[6px] py-3 rounded-t-lg"
            >
              Employee Login
            </li>
          </Link>
          <Link to='/admin-login'>
            <li 
              id="admin" 
              className="hover:bg-slate-100 px-[6px] py-3 rounded-t-lg"
            >
              Admin Login
            </li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
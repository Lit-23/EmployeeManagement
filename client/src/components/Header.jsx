import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  // states for navigation tab
  const [isHome, setIsHome] = useState(true);
  const [isAbout, setIsAbout] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleTab = (e) => {
    console.log(`isHome ${isHome}`)
    console.log(`isAbout ${isAbout}`)
    console.log(`isEmployee ${isEmployee}`)
    console.log(`isAdmin ${isAdmin}`)
    if(e.target.id === 'home') {
      setIsHome(true);
      setIsAbout(false);
      setIsEmployee(false);
      setIsAdmin(false);
    } 
    else if(e.target.id === 'about') {
      setIsHome(false);
      setIsAbout(true);
      setIsEmployee(false);
      setIsAdmin(false);
    } 
    else if(e.target.id === 'employee') {
      setIsHome(false);
      setIsAbout(false);
      setIsEmployee(true);
      setIsAdmin(false);
    } 
    else if(e.target.id === 'admin') {
      setIsHome(false);
      setIsAbout(false);
      setIsEmployee(false);
      setIsAdmin(true);
    };
  };

  // useEffect(() => {
  //   handleTab();
  // }, [isHome, isAbout, isEmployee, isAdmin])
  
  return (
    <header className='px-5 py-[8px] flex items-center justify-between bg-white shadow-md fixed left-0 right-0 top-0'>
      <Link to='/'>
        <h1 className='text-xl font-[500] text-[#2e7d32]'>LitFlix</h1>
      </Link>
      <div>
        <ul className='flex justify-center items-center'>
          <Link to='/'>
            <li 
              onClick={handleTab}
              id="home" 
              className={`hover:bg-slate-100 px-[6px] py-3 rounded-t-lg ${isHome && 'border-green-700 border-solid border-b-2'}`}
            >
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li 
              onClick={handleTab}
              id="about" 
              className={`hover:bg-slate-100 px-[6px] py-3 rounded-t-lg ${isAbout && 'border-green-700 border-solid border-b-2'}`}
            >
              About
            </li>
          </Link>
          <Link to='/employee-login'>
            <li 
              onClick={handleTab}
              id="employee" 
              className={`hover:bg-slate-100 px-[6px] py-3 rounded-t-lg ${isEmployee && 'border-green-700 border-solid border-b-2'}`}
            >
              Employee Login
            </li>
          </Link>
          <Link to='/admin-login'>
            <li 
              onClick={handleTab}
              id="admin" 
              className={`hover:bg-slate-100 px-[6px] py-3 rounded-t-lg ${isAdmin && 'border-green-700 border-solid border-b-2'}`}
            >
              Admin Login
            </li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
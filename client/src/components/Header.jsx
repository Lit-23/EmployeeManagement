import { Link, useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function Header() {  
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className='px-5 py-[8px] flex items-center justify-between bg-white shadow-md fixed left-0 right-0 top-0'>
      <Link to='/'>
        <h1 className='text-xl font-[500] text-[#2e7d32]'>LitFlix</h1>
      </Link>
      <div className="max-[769px]:hidden">
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
              Help
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
      <div className="md:hidden py-2" onClick={e=>setOpen(true)}>
        <MenuIcon sx={{color:['#2e7d32']}}/>
      </div>

      {/* modal */}
      <Menu 
        open={open} 
        onClose={e=>setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{mt:-5}}
      >
        <MenuItem onClick={e=>{setOpen(false); navigate('/');}}>Home</MenuItem>
        <MenuItem onClick={e=>{setOpen(false); navigate('/about');}}>Help</MenuItem>
        <MenuItem onClick={e=>{setOpen(false); navigate('/employee-login');}}>Employee Login</MenuItem>
        <MenuItem onClick={e=>{setOpen(false); navigate('/admin-login');}}>Admin Login</MenuItem>
      </Menu>
    </header>
  )
}
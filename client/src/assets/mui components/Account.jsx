import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// imports for signout functionality
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../store/employeeSlice/employeeSlice.js';

export default function Account() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // signout functionality
  const defaultProfile = 'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif';
  const { currentUser } = useSelector(state => state.employee);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/employee/signout');
      dispatch(signout());
      navigate('/employee-login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <img 
        src={ currentUser.profilePicture } 
        className="h-8 w-8 self-center rounded-full object-cover my-3"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          handleClose();
          navigate('/profile');
        }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
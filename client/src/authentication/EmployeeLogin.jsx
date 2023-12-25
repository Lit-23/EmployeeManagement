import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signinStart, signinSuccess, signinFailure } from "../store/employeeSlice/employeeSlice.js";

export default function EmployeeLogin() {
  const { currentEmployee, admin, loading, error } = useSelector((state) => state.employee);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // signin start
      dispatch(signinStart());

      // fetch to send and get the data from api/server
      const res = await fetch('/api/employee/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // signin fail
      if(data.success === false) {
        dispatch(signinFailure(data));
        return;
      };

      // signin success
      dispatch(signinSuccess(data));
      navigate('/dashboard');
    } catch (error) {
      dispatch(signinFailure(error));
    }
  };

  return (
    <>
      <Header />
      <section className="text-xl max-[768px]:text-lg max-[640px]:text-base min-h-[80vh] p-5 mt-24 flex flex-col items-center">
        <div className='w-[550px] max-[640px]:w-full'>
          <h1 className="text-center font-semibold text-3xl max-[640px]:text-2xl mb-3">Employee Login</h1>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor="email" className='mx-5'>
              Email:
            </label>
            <input 
              required
              id='email'
              className='bg-gray-200 p-3 mx-5 my-3 rounded-md' 
              type="email" 
              onChange={handleChange}
            />
            <label htmlFor="email" className='mx-5'>
              Password:
            </label>
            <input 
              required
              id='password'
              className='bg-gray-200 p-3 mx-5 mt-3 mb-6 rounded-md' 
              type="password"
              onChange={handleChange}
            />
            {
              error 
              ?  <p className='text-red-700 mx-5 mb-3'>{error.message}</p>
              || <p className='text-red-700 mx-5 mb-3'>Something went wrong!</p>
              :  ''
            }
            <Button type='submit' variant="contained" color="success" sx={{ marginX: '20px', padding: '12px' }}>
              { loading ? 'LOADING...' : 'LOGIN' }
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

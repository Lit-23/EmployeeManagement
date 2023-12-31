import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { adminSignin } from '../store/employeeSlice/employeeSlice.js';

export default function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminSignin());
    navigate('/dashboard');
  };

  return (
    <>
      <Header />
      <section className="text-xl max-[768px]:text-lg max-[640px]:text-base min-h-[80vh] p-5 mt-24 flex flex-col items-center">
        <div className='w-[550px] max-[640px]:w-full'>
          <h1 className="text-center font-[500] text-3xl max-[640px]:text-2xl mb-3">Admin Login</h1>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <label htmlFor="email" className='mx-5'>
              Email:
            </label>
            <input 
              id='email'
              className='bg-gray-200 p-3 mx-5 my-3 rounded-md' 
              type="email" 
              defaultValue='admin@gmail.com'
            />
            <label htmlFor="email" className='mx-5'>
              Password:
            </label>
            <input 
              id='password'
              className='bg-gray-200 p-3 mx-5 mt-3 mb-6 rounded-md' 
              type="password"
              defaultValue='password'
            />
            <Button type='submit' variant="contained" color="success" sx={{ marginX: '20px', padding: '12px' }}>LOGIN</Button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

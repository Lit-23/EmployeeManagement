import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function EmployeeLogin() {
  return (
    <>
      <Header />
      <section className="text-xl max-[768px]:text-lg max-[640px]:text-base min-h-[80vh] p-5 mt-24 flex flex-col items-center">
        <div className='w-[550px] max-[640px]:w-full'>
          <h1 className="text-center font-semibold text-3xl max-[640px]:text-2xl mb-3">Employee Login</h1>
          <div className='flex flex-col'>
              <label htmlFor="email" className='mx-5'>
                Email:
              </label>
              <input 
                id='email'
                className='bg-gray-200 p-3 mx-5 my-3 rounded-md' 
                type="email" 
              />
              <label htmlFor="email" className='mx-5'>
                Password:
              </label>
              <input 
                id='password'
                className='bg-gray-200 p-3 mx-5 my-3 rounded-md' 
                type="password"
              />
            
              <button 
                type='submit'
                className='mx-5 mt-2 p-3 rounded-md bg-green-700 hover:opacity-90 duration-300 text-white'
              >
                Login
              </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

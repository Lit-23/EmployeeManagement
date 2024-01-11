import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Header />
      <section className="text-xl max-[768px]:text-lg max-[640px]:text-base min-h-[85vh] p-5 mt-16 flex flex-col items-center">
        <h1 className="font-[500] text-3xl max-[640px]:text-2xl mb-3">
          Instructions for the Employee Management Web App:
        </h1>
        <ol className='max-w-[800px] flex flex-col text-center list-decimal list-inside'>
          <li className='mb-2'>Access the admin portal by logging in.</li>
          <li className='mb-2'>Add new employees to the system.</li>
          <li className='mb-2'>The employee's default login credentials for the employee portal will be their email and company ID.</li>
          <li className='mb-2'>Update or delete employee data in the admin portal as needed.</li>
        </ol>
      </section>
      <Footer />
    </>
  )
}

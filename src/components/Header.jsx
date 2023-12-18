import React from 'react'

export default function Header() {
  return (
    <header className='px-5 py-3 flex justify-between bg-white shadow-md fixed left-0 right-0 top-0'>
      <h1 className='text-2xl font-semibold text-green-700'>LitFlix</h1>
      <div>
        <ul className='flex justify-center items-center gap-3'>
          <li>Home</li>
          <li>About</li>
          <li>Sign In</li>
        </ul>
      </div>
    </header>
  )
}
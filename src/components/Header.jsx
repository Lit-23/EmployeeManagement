import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className='px-5 py-3 flex justify-between bg-white shadow-md fixed left-0 right-0 top-0'>
      <Link to='/'>
        <h1 className='text-2xl font-semibold text-green-700'>LitFlix</h1>
      </Link>
      <div>
        <ul className='flex justify-center items-center gap-3'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/employee-login'>
            <li>Employee Login</li>
          </Link>
          <Link to='/admin-login'>
            <li>Admin Login</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
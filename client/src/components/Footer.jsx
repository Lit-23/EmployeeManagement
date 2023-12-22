import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className='p-10 text-green-700 bg-white text-center max-[640px]:py-5'>
      <div className="flex flex-col mb-5">
        <div className="mb-5 max-[640px]:mb-2">
          <Link to='/'>
            <h1 className="font-bold text-[2rem] max-[640px]:text-lg">LitFlix</h1>
          </Link>
        </div>

        <div className="flex justify-center gap-10 max-[640px]:flex-col max-[640px]:gap-2">
          <div>
            <h2 className="font-bold text-[1.2rem] max-[640px]:text-sm">My Account</h2>
            <ul>
              <Link to='/employee-login'>
                <li className="hover:underline text-gray-500 cursor-pointer max-[640px]:text-xs">Employee Login</li>
              </Link>
              <Link to='/admin-login'>
                <li className="hover:underline text-gray-500 cursor-pointer max-[640px]:text-xs">Admin Login</li>
              </Link>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-[1.2rem] max-[640px]:text-sm">Company</h2>
            <ul>
              <Link to='/about'>
                <li className="hover:underline text-gray-500 cursor-pointer max-[640px]:text-xs">About Us</li>
              </Link>
              <li className="hover:underline text-gray-500 cursor-pointer max-[640px]:text-xs">News</li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-[1.2rem] max-[640px]:text-sm">Contact Us</h2>
            <p className="hover:underline text-gray-500 cursor-pointer max-[640px]:text-xs">litflix@support.com</p>
          </div>
        </div>
      </div>

      <hr />
      <div className="mt-5">
        <h2 className="font-bold text-[1.2rem] mb-1 max-[640px]:text-sm">©LitFlix 2023</h2>
        <div className="flex justify-center gap-3 text-gray-500 max-[640px]:text-xs">
          <span className="hover:underline cursor-pointer">Terms & Conditions</span>
          <br />
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </section>
  )
}

export default Footer
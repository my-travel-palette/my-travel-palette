import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header>
      {/* Top bar: green background, home icon left, buttons right */}
      <div className="w-full bg-emerald-800 p-4 flex justify-between items-center">
        {/* Home Icon on the left */}
        <NavLink
          to="/"
          className="flex items-center text-white hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m0 0h4m-4 0H7"
            />
          </svg>
          <span className="ml-2 hidden sm:inline font-semibold">Home</span>
        </NavLink>

        {/* Login and Register buttons on the right */}
        <div className="flex space-x-2">
          <button className="btn btn-neutral bg-stone-300 text-success-content font-semibold">
            Login
          </button>
          <button className="btn btn-neutral bg-stone-300 text-success-content font-semibold">
            Register
          </button>
        </div>
      </div>

      {/* Rest of your header, like title and quote, goes here */}
    </header>
  );
}

export default Header;

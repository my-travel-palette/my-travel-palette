import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header>
      {/* Top bar with Home icon on the left and buttons on the right
      <div className="w-full bg-emerald-800 p-4 flex justify-between items-center">

        <NavLink to="/" className="flex items-center text-white hover:text-gray-200">
          <HomeIcon className="w-6 h-6" />
          <span className="ml-2 hidden sm:inline font-semibold">Home</span>
        </NavLink>
        </div> */}

      <div className="w-full bg-emerald-800 p-4 flex justify-end">
        <div className="flex-1 text-3xl text-stone-300">
          <NavLink to="/">
            <i class="fa fa-home"></i>
          </NavLink>
        </div>
        <div className="flex-none">
          <button className="btn btn-neutral bg-stone-300 text-success-content font-semibold">
            Login
          </button>
          <button className="btn btn-neutral bg-stone-300 text-success-content font-semibold">
            Register
          </button>
        </div>
      </div>

      <NavLink
        to="/"
        className="block w-full bg-base-100 p-6 text-3xl font-bold font-sans text-success-content text-center"
      >
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={logo} alt="logo image" />
          </div>
        </div>
        My Travel Palette
        <div className="text-sm font-normal text-accent-content font-sans">
          "These are the colors of my heart - the places I've traveled, the
          skies I've memorized,
          <br />
          and the moments that have stayed in my heart. With each trip I paint a
          little more of my world."
        </div>
      </NavLink>
    </header>
  );
}

export default Header;

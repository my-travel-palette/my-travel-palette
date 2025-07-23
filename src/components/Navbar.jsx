import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-base-100 px-4 py-3 shadow-md">
      {/* Mobile toggle button */}
      <div className="md:hidden flex justify-between items-center">
        <div className="text-lg font-bold text-neutral">Menu</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-neutral"
        >
          ☰
        </button>
      </div>

      {/* Nav links */}
      <div
        className={`flex-col md:flex-row md:flex justify-center gap-4 mt-2 md:mt-0 text-lg font-mono text-neutral ${
          isOpen ? "flex" : "hidden md:flex"
        }`}
      >
        <NavLink
          to="/about-me"
          className="hover:underline px-2 py-1"
          onClick={() => setIsOpen(false)}
        >
          ABOUT US
        </NavLink>
        <NavLink
          to="/my-travels"
          className="hover:underline px-2 py-1"
          onClick={() => setIsOpen(false)}
        >
          MY TRAVELS
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

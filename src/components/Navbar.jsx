import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-center gap-8 py-6 text-lg font-mono font-large text-neutral">
      <NavLink to="/about-me">ABOUT ME</NavLink>
      <NavLink to="/my-travels">MY TRAVELS</NavLink>
    </nav>
  );
}

export default Navbar;

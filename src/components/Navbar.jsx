import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink to="/about-me">About Me</NavLink>
      <NavLink to="/my-travels">My Travels</NavLink>
    </nav>
  );
}

export default Navbar;

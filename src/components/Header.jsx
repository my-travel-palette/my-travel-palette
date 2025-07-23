import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header>
      <div className="w-full bg-emerald-800 p-4 py-3 md:py-4 flex flex-wrap justify-between items-center">
        <div className="text-2xl md:text-3xl text-stone-300">
          <NavLink to="/">
            <i className="fa fa-home"></i>
          </NavLink>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
          {currentUser ? (
            // User is logged in - show user info, profile, and logout
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm md:text-base">
                Welcome <strong>{currentUser.name}</strong> | {currentUser.role}
              </div>
              <button
                className="btn btn-sm md:btn-md bg-white text-emerald-800 hover:bg-gray-100 border-none font-semibold"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>
              <button
                className="btn btn-sm md:btn-md bg-red-600 text-white hover:bg-red-700 border-none font-semibold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            // User is not logged in - show login and register
            <div className="flex space-x-2">
              <button
                className="btn btn-sm md:btn-md w-24 bg-white text-emerald-800 hover:bg-gray-100 border-none font-semibold"
                onClick={() => navigate("/log-in")}
              >
                Login
              </button>
              <button
                className="btn btn-sm md:btn-md w-24 bg-white text-emerald-800 hover:bg-gray-100 border-none font-semibold"
                onClick={() => navigate("/sign-up")}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      <NavLink
        to="/"
        className="block w-full bg-base-100 px-4 py-6 md:py-10 text-center"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto text-center md:text-left justify-center">
          {/* Logo on the left */}
          <div className="avatar flex-shrink-0">
            <div className="w-20 rounded-full overflow-hidden border-4 border-emerald-800">
              <img
                src={logo}
                alt="logo image"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Title and description on the right */}
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-4xl font-bold text-success-content">
              My Travel Palette
            </h1>
            <p className="text-xs md:text-sm font-normal text-accent-content max-w-xl mt-2 md:mt-4">
              "These are the colors of my heart – the places I've traveled, the
              skies I've memorized, and the moments that have stayed in my
              heart. With each trip I paint a little more of my world."
            </p>
          </div>
        </div>{" "}
      </NavLink>
    </header>
  );
}

export default Header;

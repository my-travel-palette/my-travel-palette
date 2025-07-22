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
            <div className="w-full bg-emerald-800 p-4 flex justify-end">
                <div className="flex-1 text-3xl text-stone-300">
                    <NavLink to="/">
                        <i className="fa fa-home"></i>
                    </NavLink>
                </div>
                <div className="flex-none">
                    {currentUser ? (
                        // User is logged in - show user info, profile, and logout
                        <div className="flex items-center space-x-4">
                            <div className="text-white text-sm">
                                Welcome {currentUser.name}! | {currentUser.role}
                            </div>
                            <button 
                                className="btn bg-white text-emerald-800 hover:bg-gray-100 border-none font-semibold px-4 py-2"
                                onClick={() => navigate('/profile')}
                            >
                                Profile
                            </button>
                            <button 
                                className="btn bg-red-600 text-white hover:bg-red-700 border-none font-semibold px-4 py-2"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        // User is not logged in - show login and register
                        <div className="flex space-x-2">
                            <button 
                                className="btn bg-white text-emerald-800 hover:bg-gray-100 border-none font-semibold px-6 py-2" 
                                onClick={() => navigate('/log-in')}
                            >
                                Login
                            </button>
                            <button 
                                className="btn bg-white text-emerald-800 hover:bg-gray-100 border-none font-semibold px-6 py-2"  
                                onClick={() => navigate('/sign-up')}
                            >
                                Register
                            </button>
                        </div>
                    )}
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

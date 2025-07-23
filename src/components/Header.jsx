import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";

function Header() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allBlogs, setAllBlogs] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAllBlogs = () => {
      axios.get(`${BASE_URL}/blogs.json`)
        .then((response) => {
          if (response.data) {
            const blogsArr = Object.keys(response.data).map((id) => ({
              id,
              ...response.data[id],
            }));
            setAllBlogs(blogsArr);
          }
        })
        .catch((error) => {
          console.error("Error fetching blogs for search:", error);
        });
    };

    fetchAllBlogs();
  }, []);

  // Filter blogs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
    } else {
      const filtered = allBlogs.filter((blog) => {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = blog.title?.toLowerCase().includes(searchLower);
        const descriptionMatch = blog.description?.toLowerCase().includes(searchLower);
        const authorMatch = Array.isArray(blog.author)
          ? blog.author.some(author => author.toLowerCase().includes(searchLower))
          : blog.author?.toLowerCase().includes(searchLower);

        return titleMatch || descriptionMatch || authorMatch;
      });
      setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
      setShowResults(true);
    }
  }, [searchTerm, allBlogs]);

  const handleSearchClick = (blogId) => {
    setSearchTerm("");
    setShowResults(false);
    setShowSearch(false);
    setMobileMenuOpen(false);
    navigate(`/blogs/${blogId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchClick(searchResults[0].id);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowResults(false);
    setShowSearch(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchTerm("");
      setShowResults(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowSearch(false);
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
            <span className="text-2xl sm:text-3xl font-semibold text-gray-900 group-hover:text-[#d89d20] transition-colors" style={{ fontFamily: 'Dancing Script, cursive' }}>
              My Travel Palette
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/my-travels"
              className="text-gray-600 hover:text-[#d89d20] font-medium transition-colors"
            >
              My Travels
            </NavLink>
            <NavLink
              to="/about-me"
              className="text-gray-600 hover:text-[#d89d20] font-medium transition-colors"
            >
              About Us
            </NavLink>

            {/* Desktop Search */}
            <div className="relative">
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-500 hover:text-[#d89d20] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>

              {showSearch && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
                  <form onSubmit={handleSearchSubmit} className="p-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search blogs..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowResults(true)}
                        autoFocus
                      />
                      {searchTerm && (
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Search Results */}
                  {showResults && searchResults.length > 0 && (
                    <div className="max-h-60 overflow-y-auto border-t border-gray-100">
                      {searchResults.map((blog) => (
                        <div
                          key={blog.id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleSearchClick(blog.id)}
                        >
                          <div className="w-12 h-8 rounded overflow-hidden">
                            <img
                              src={blog.imageUrl}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/48x32?text=Image";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate text-gray-900">{blog.title}</h4>
                            <p className="text-xs text-gray-500 truncate">
                              {Array.isArray(blog.author) ? blog.author.join(", ") : blog.author}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No results message */}
                  {showResults && searchTerm && searchResults.length === 0 && (
                    <div className="p-4 text-center text-gray-500 border-t border-gray-100">
                      No blogs found matching "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{currentUser.name}</span>
                </span>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-[#5a7d1a] hover:bg-[#4a6d15] rounded-lg transition-colors"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-[#d89d20] hover:bg-[#be6406] rounded-lg transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#5a7d1a] transition-colors"
                  onClick={() => navigate("/log-in")}
                >
                  Login
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-[#5a7d1a] hover:bg-[#4a6d15] rounded-lg transition-colors"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gradient Line */}
      <div className="h-0.5 bg-gradient-to-r from-[#5a7d1a] via-[#d89d20] to-[#be6406]"></div>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-transparent"
            onClick={closeMobileMenu}
          ></div>

          {/* Menu Content */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Navigation Links */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
                  <div className="space-y-2">
                    <NavLink
                      to="/my-travels"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#5a7d1a] hover:text-white rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      My Travels
                    </NavLink>
                    <NavLink
                      to="/about-me"
                      className="block px-4 py-3 text-gray-700 hover:bg-[#5a7d1a] hover:text-white rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      About Us
                    </NavLink>
                  </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search blogs..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowResults(true)}
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Search Results */}
                  {showResults && searchResults.length > 0 && (
                    <div className="mt-3 max-h-48 overflow-y-auto bg-white rounded-lg border border-gray-200">
                      {searchResults.map((blog) => (
                        <div
                          key={blog.id}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => handleSearchClick(blog.id)}
                        >
                          <div className="w-12 h-8 rounded overflow-hidden">
                            <img
                              src={blog.imageUrl}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/48x32?text=Image";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate text-gray-900">{blog.title}</h4>
                            <p className="text-xs text-gray-500 truncate">
                              {Array.isArray(blog.author) ? blog.author.join(", ") : blog.author}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No results message */}
                  {showResults && searchTerm && searchResults.length === 0 && (
                    <div className="mt-3 p-3 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
                      No blogs found matching "{searchTerm}"
                    </div>
                  )}
                </div>
              </div>

              {/* Auth Section */}
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 text-sm text-gray-600">
                      Welcome, <span className="font-medium">{currentUser.name}</span>
                    </div>
                    <button
                      className="w-full px-4 py-3 text-sm font-medium text-white bg-[#5a7d1a] hover:bg-[#4a6d15] rounded-lg transition-colors"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </button>
                    <button
                      className="w-full px-4 py-3 text-sm font-medium text-white bg-[#d89d20] hover:bg-[#be6406] rounded-lg transition-colors"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      className="w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#5a7d1a] transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/log-in");
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="w-full px-4 py-3 text-sm font-medium text-white bg-[#5a7d1a] hover:bg-[#4a6d15] rounded-lg transition-colors"
                      onClick={() => {
                        closeMobileMenu();
                        navigate("/sign-up");
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

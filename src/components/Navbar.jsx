import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Fetch all blogs for search
  const [allBlogs, setAllBlogs] = useState([]);

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

      {/* Nav links and search */}
      <div
        className={`flex-col md:flex-row md:flex justify-center items-center gap-4 mt-2 md:mt-0 text-lg font-mono text-neutral ${
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
        
        {/* Search Icon */}
        <button
          onClick={toggleSearch}
          className="text-neutral hover:text-primary transition-colors duration-200"
          title="Search blogs"
        >
          <i className="fa fa-search text-lg"></i>
        </button>
      </div>

      {/* Search Field - appears when search icon is clicked */}
      {showSearch && (
        <div className="mt-4 md:mt-2 relative">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search all blogs..."
                  className="input input-bordered w-full pl-10 pr-10 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowResults(true)}
                  autoFocus
                />
                <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <i className="fa fa-times"></i>
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 w-full max-w-md">
              <div className="max-h-60 overflow-y-auto">
                {searchResults.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSearchClick(blog.id)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-12 h-8 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/48x32?text=Image";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{blog.title}</h4>
                        <p className="text-xs text-gray-500 truncate">
                          {Array.isArray(blog.author) ? blog.author.join(", ") : blog.author}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 text-xs text-gray-500 text-center border-t border-gray-100">
                Press Enter to view first result
              </div>
            </div>
          )}

          {/* No results message */}
          {showResults && searchTerm && searchResults.length === 0 && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 w-full max-w-md">
              <div className="p-3 text-center text-gray-500">
                No blogs found matching "{searchTerm}"
              </div>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close search results */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </nav>
  );
}

export default Navbar;

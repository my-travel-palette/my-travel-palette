import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { Link } from "react-router-dom";

function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/log-in');
      return;
    }
    fetchBookmarks();
  }, [currentUser, navigate]);

  const fetchBookmarks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${BASE_URL}/bookmarks.json`);
      if (response.data) {
        const userBookmarks = Object.values(response.data).filter(
          bookmark => bookmark.userId === currentUser.uid
        );
        setBookmarks(userBookmarks);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      setError("Failed to load bookmarks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (blogId) => {
    try {
      const response = await axios.get(`${BASE_URL}/bookmarks.json`);
      if (response.data) {
        const bookmarkToDelete = Object.keys(response.data).find(
          key => response.data[key].userId === currentUser.uid && response.data[key].blogId === blogId
        );
        
        if (bookmarkToDelete) {
          await axios.delete(`${BASE_URL}/bookmarks/${bookmarkToDelete}.json`);
          setBookmarks(bookmarks.filter(bookmark => bookmark.blogId !== blogId));
        }
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
      alert("Failed to remove bookmark. Please try again.");
    }
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-teal-700"></span>
          <p className="mt-4 text-lg">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="alert alert-error max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <span>{error}</span>
          </div>
          <button 
            className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none mt-4"
            onClick={fetchBookmarks}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-700">
        My Bookmarks
      </h1>
      
      <div className="p-2 flex justify-between items-center">
        <Link to="/" className="btn btn-ghost text-xl">
          <i className="fa fa-chevron-left p-2" aria-hidden="true"></i>Back
        </Link>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookmarks yet</h3>
            <p className="text-gray-500 mb-4">Start bookmarking your favorite blog posts to see them here.</p>
            <Link to="/my-travels" className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none">
              Explore Blogs
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.blogId} className="card bg-base-300 shadow-md">
              <div className="relative">
                <button
                  className="btn btn-circle btn-sm absolute top-2 right-2 text-yellow-500 hover:text-yellow-600"
                  onClick={() => removeBookmark(bookmark.blogId)}
                  title="Remove from bookmarks"
                >
                  <i className="fa fa-bookmark"></i>
                </button>
                
                <Link to={`/blogs/${bookmark.blogId}`}>
                  <figure className="w-full h-48 overflow-hidden">
                    <img
                      src={bookmark.blogImageUrl}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                      }}
                      alt={bookmark.blogTitle}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-sm">{bookmark.blogTitle}</h2>
                    <p className="text-xs text-gray-600">
                      by {Array.isArray(bookmark.blogAuthor) ? bookmark.blogAuthor.join(" & ") : bookmark.blogAuthor}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(bookmark.blogDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      Bookmarked on {new Date(bookmark.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarksPage; 
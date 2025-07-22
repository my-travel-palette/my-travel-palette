import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";

function BookmarkButton({ blogId, blogTitle, blogImageUrl, blogAuthor, blogDate }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      checkBookmarkStatus();
    }
  }, [currentUser, blogId]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bookmarks.json`);
      if (response.data) {
        const userBookmarks = Object.values(response.data).filter(
          bookmark => bookmark.userId === currentUser.uid && bookmark.blogId === blogId
        );
        setIsBookmarked(userBookmarks.length > 0);
      }
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const toggleBookmark = async () => {
    if (!currentUser) {
      navigate('/log-in');
      return;
    }

    setLoading(true);
    try {
      if (isBookmarked) {
        // Remove bookmark
        const response = await axios.get(`${BASE_URL}/bookmarks.json`);
        if (response.data) {
          const bookmarkToDelete = Object.keys(response.data).find(
            key => response.data[key].userId === currentUser.uid && response.data[key].blogId === blogId
          );
          
          if (bookmarkToDelete) {
            await axios.delete(`${BASE_URL}/bookmarks/${bookmarkToDelete}.json`);
            setIsBookmarked(false);
          }
        }
      } else {
        // Add bookmark
        const bookmarkData = {
          userId: currentUser.uid,
          blogId: blogId,
          blogTitle: blogTitle,
          blogImageUrl: blogImageUrl,
          blogAuthor: blogAuthor,
          blogDate: blogDate,
          dateAdded: new Date().toISOString()
        };
        
        await axios.post(`${BASE_URL}/bookmarks.json`, bookmarkData);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      alert("Failed to update bookmark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Only show bookmark button for logged-in users
  if (!currentUser) {
    return null;
  }

  return (
    <button
      className={`btn btn-ghost btn-sm ${isBookmarked ? 'text-yellow-500' : 'text-gray-400'}`}
      onClick={toggleBookmark}
      disabled={loading}
      title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <i className={`fa ${isBookmarked ? 'fa-bookmark' : 'fa-bookmark-o'}`}></i>
      )}
    </button>
  );
}

export default BookmarkButton; 
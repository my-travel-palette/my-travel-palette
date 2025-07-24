import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config/api";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import BookmarkButton from "../components/BookmarkButton";
import { useAuth } from "../contexts/AuthContext";

function HtmlRenderer({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

function BlogDetailPage() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { blogId } = useParams();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    getBlog();
  }, [blogId]);

  const getBlog = () => {
    setLoading(true);
    setError(null);
    
    axios
      .get(`${BASE_URL}/blogs/${blogId}.json?_embed=tasks`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log("Error getting blog details from the API...", error);
        setError("Failed to load blog. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteBlog = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`${BASE_URL}/blogs/${blogId}.json`)
        .then(() => {
          navigate("/blogs");
        })
        .catch((error) => {
          console.log("Error deleting blog from the API...", error);
          alert("Failed to delete blog. Please try again.");
        });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg text-base-content">Loading blog...</p>
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
            className="btn btn-primary mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="alert alert-warning max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <span>Blog not found</span>
          </div>
          <Link to="/my-travels" className="btn btn-primary mt-4">
            Go Back to Travels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 mt-8">
            <h1 className="text-4xl font-bold text-center text-base-content mb-4">{blog.title}</h1>
            
            <div className="text-sm text-center text-base-content/70 mb-6">
              by {" " + blog.author.join(" & ") + " • "}
              <span>{new Date(blog.date).toDateString()}</span>
            </div>
          </div>

          {/* Navigation and Bookmark */}
          <div className="flex justify-between items-center mb-6">
            <Link to={`/my-travels/${blog.travelId}`} className="btn btn-ghost text-base-content">
              <i className="fa fa-chevron-left mr-2" aria-hidden="true"></i>Back
            </Link>
            <BookmarkButton 
              blogId={blogId}
              blogTitle={blog.title}
              blogImageUrl={blog.imageUrl}
              blogAuthor={blog.author}
              blogDate={blog.date}
            />
          </div>

          {/* Main Image */}
          <div className="mb-8">
            <img
              className="w-full h-96 rounded-lg object-cover object-center shadow-lg"
              src={blog.imageUrl}
              alt={blog.title}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
              }}
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-base-content">
            <HtmlRenderer content={blog.content} />
          </div>

          {/* Resources */}
          {blog.resources && blog.resources.length > 0 && (
            <div className="mt-8 p-6 bg-base-200 rounded-lg">
              <h2 className="text-2xl font-bold text-base-content mb-4">Useful links:</h2>
              <div className="space-y-2">
                {blog.resources.map((resourcesObj, index) => (
                  <a href={resourcesObj.link} key={index} className="link link-primary block">
                    {resourcesObj.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="mt-8">
            <CommentSection blogId={blogId} />
          </div>

          {/* Admin Buttons */}
          {isAdmin && (
            <div className="mt-8 flex flex-wrap justify-end gap-4">
              <button className="btn btn-outline border-[#b03a2e] text-[#b03a2e] hover:bg-[#b03a2e] hover:text-white" onClick={deleteBlog}>
                <i className="fa fa-trash mr-2"></i>Delete
              </button>
              <button
                className="btn btn-outline border-[#5A7D1A] text-[#5A7D1A] hover:bg-[#5A7D1A] hover:text-white"
                onClick={() => navigate(`/blog/edit/${blogId}`)}
              >
                <i className="fa fa-edit mr-2"></i>Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;

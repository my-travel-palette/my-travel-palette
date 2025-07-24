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
          <span className="loading loading-spinner loading-lg text-teal-700"></span>
          <p className="mt-4 text-lg">Loading blog...</p>
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
          <Link to="/my-travels" className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none mt-4">
            Go Back to Travels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="mb-4">
        <h1 className="text-3xl mb-4 text-center text-teal-700">{blog.title}</h1>
      </div>
      
      <div className="text-sm mb-4 text-center text-teal-700">
        by {" " + blog.author.join(" & ") + " • "}
        <span>{new Date(blog.date).toDateString()}</span>
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex justify-between items-center">
        <Link to={`/my-travels/${blog.travelId}`} className="text-xl link">
          <i className="fa fa-chevron-left p-2" aria-hidden="true"></i>Back
        </Link>
        <BookmarkButton 
          blogId={blogId}
          blogTitle={blog.title}
          blogImageUrl={blog.imageUrl}
          blogAuthor={blog.author}
          blogDate={blog.date}
        />
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <img
          className="h-80 w-full rounded-lg object-cover object-center"
          src={blog.imageUrl}
          alt={blog.title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
          }}
        />
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 pt-6 text-lg text-justify">
        <HtmlRenderer content={blog.content} />
      </div>

      {blog.resources && blog.resources.length > 0 && (
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 pt-6 text-lg text-justify">
          <h1 className="font-bold">Useful links:</h1>
          {blog.resources.map((resourcesObj, index) => (
            <a href={resourcesObj.link} key={index} className="link link-primary">
              <p>{resourcesObj.title}</p>
            </a>
          ))}
        </div>
      )}

      {/* Comments Section */}
      <CommentSection blogId={blogId} />

      {/* Buttons */}
      {isAdmin && (
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 pt-6 flex flex-wrap justify-end gap-4">
          <button className="btn bg-red-600 hover:bg-red-700 text-white border-none" onClick={deleteBlog}>
            Delete
          </button>
          <button
            className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none"
            onClick={() => navigate(`/blog/edit/${blogId}`)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogDetailPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function BlogListPage() {
  const [blogList, setBlogList] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { travelId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch travel title and blogs in parallel
    Promise.all([
      axios.get(`${BASE_URL}/travels/${travelId}.json`),
      axios.get(`${BASE_URL}/blogs.json`),
    ])
      .then(([travelResponse, blogsResponse]) => {
        console.log(travelResponse.data);
        setTitle(travelResponse.data.title);

        const blogsArr = Object.keys(blogsResponse.data).map((id) => ({
          id,
          ...blogsResponse.data[id],
        }));

        // Filter blogs by travelId from URL
        const filteredBlogs = blogsArr.filter(
          (blog) => blog.travelId === travelId
        );

        setBlogList(filteredBlogs);
      })
      .catch((error) => {
        console.log("Error getting data from the API...", error);
        setError("Failed to load blogs. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [travelId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  //console.log(JSON.stringify(currentUser))

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const deleteBlog = (blogId) => {
    axios
      .delete(`${BASE_URL}/blogs/${blogId}.json`)
      .then(() => {
        setBlogList(blogList.filter((e) => e.id !== blogId));
      })
      .catch((error) => {
        console.log("Error deleting blogs from the API...", error);
        alert("Failed to delete blog. Please try again.");
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-teal-700"></span>
          <p className="mt-4 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="alert alert-error max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
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


  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-700 ">
        {title}
      </h1>
      
      <div className="p-2 flex justify-between items-center">
        <Link to={`/my-travels`} className="btn btn-ghost text-xl">
          <i className="fa fa-chevron-left p-2" aria-hidden="true"></i>Back
        </Link>
        {isAdmin && (
          <Link to={`/add-blog/${travelId}`} className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none text-base px-4 py-2">
            <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add New Blog
          </Link>
        )}

        {/* Users can comment 
        {currentUser?.role === "user" && <CommentSection blogId={blogId} />}*/}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-5">
        {blogList.length === 0 ? (
          <div className="col-span-full flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No blogs found</h3>
              <p className="text-gray-500 mb-4">Share your travel experiences by creating your first blog post.</p>
              {isAdmin && (
                <Link to={`/add-blog/${travelId}`} className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none">
                  <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add New Blog
                </Link>
              )}
            </div>
          </div>
        ) : (
          blogList.map((blog) => {
            return (
              <div key={blog.id} className="card bg-base-300 w-96 shadow-sm">
                {isAdmin && (
                  <>
                    <button
                      className="btn btn-circle btn-sm absolute top-2 right-2 text-emerald-800"
                      onClick={() => {
                        deleteBlog(blog.id);
                      }}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>

                    <button
                      className="btn btn-circle btn-sm absolute top-12 right-2 text-emerald-800"
                      onClick={() => {
                        navigate(`/blog/edit/${blog.id}`);
                      }}
                    >
                      <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </button>
                  </>
                )}

                <Link to={`/blogs/${blog.id}`}>
                  <figure className="w-full h-48 overflow-hidden">
                    <img
                      src={blog.imageUrl}
                      className="w-full h-full object-cover"
                      onClick={() => handleBlogClick(blog.id)}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                      }}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{blog.title}</h2>
                    <p>{blog.description}</p>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BlogListPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BlogListPage() {
  const [blogList, setBlogList] = useState([]);
  const [title, setTitle] = useState("");
  const { travelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/travels/${travelId}.json`)
      .then((response) => {
        console.log(response.data);
        setTitle(response.data.title);
      })
      .catch((error) =>
        console.log("Error getting travel list page from the API...", error)
      );
    axios
      .get(`${BASE_URL}/blogs.json`)
      .then((response) => {
        const blogsArr = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));

        // Filter blogs by travelId from URL
        const filteredBlogs = blogsArr.filter(
          (blog) => blog.travelId === travelId
        );

        setBlogList(filteredBlogs);
      })
      .catch((error) =>
        console.log("Error getting project details from the API...", error)
      );
  }, [travelId]);

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const deleteBlog = (blogId) => {
    axios
      .delete(`${BASE_URL}/blogs/${blogId}.json`)
      .then(() => {
        setBlogList(blogList.filter((e) => e.id !== blogId));
      })
      .catch((error) =>
        console.log("Error deleting blogs from the API...", error)
      );
  };

  return (
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-700 ">
        {title}
      </h1>
      <div className="p-2">
        <Link to={`/my-travels`} className="text-xl link">
          <i className="fa fa-chevron-left p-2" aria-hidden="true"></i>Back
        </Link>
        <Link to={`/add-blog`} className="text-xl p-5 link link-accent">
          <i className="fa fa-plus p-2" aria-hidden="true"></i>Add New Blog
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-5">
        {blogList.map((blog) => {
          return (
            <div key={blog.id} className="card bg-base-300 w-96 shadow-sm">
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

              <Link to={`/blogs/${blog.id}`}>
                <figure className="w-full h-48 overflow-hidden">
                  <img
                    src={blog.imageUrl}
                    className="w-full h-full object-cover"
                    onClick={() => handleBlogClick(blog.id)}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{blog.title}</h2>
                  <p>{blog.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogListPage;

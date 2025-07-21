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

  const deleteTravel = () => {
    axios
      .delete(`${BASE_URL}/travels/${travelId}.json`)
      .then(() => {
        navigate("/my-travels");
      })
      .catch((error) =>
        console.log("Error deleting travels from the API...", error)
      );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-700 ">
        {title}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {blogList.map((blog) => {
          return (
            <div key={blog.id} className="card bg-base-100 w-96 shadow-sm">
              <div className="text-black font-semibold text-sm">
                {blog.title}{" "}
              </div>
              <figure className="w-full h-48 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  className="w-full h-full object-cover"
                  onClick={() => handleBlogClick(blog.id)}
                />
              </figure>
              <Link to={`/blog/edit/${blog.id}`}>
                <button>Edit Blog</button>
              </Link>
            </div>
          );
        })}
        {/* Buttons */}

        <button onClick={deleteTravel}>Delete</button>

        <Link to={`/my-travels`}>
          <button>Back to my travels</button>
        </Link>
      </div>
    </div>
  );
}

export default BlogListPage;

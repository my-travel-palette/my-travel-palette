import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BlogListPage() {
  const [blogList, setBlogList] = useState([]);
  const { travelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
      <h1>Blogs</h1>
      {blogList.map((blog) => {
        return (
          <div key={blog.id}>
            {blog.title}{" "}
            <img src={blog.imageUrl} onClick={() => handleBlogClick(blog.id)} />
          </div>
        );
      })}
      {/* Buttons */}

      <Link to={`/blog/edit/${travelId}`}>
        <button>Edit</button>
      </Link>

      <button onClick={deleteTravel}>Delete</button>

      <Link to={`/my-travels`}>
        <button>Back to my travels</button>
      </Link>
    </div>
  );
}

export default BlogListPage;

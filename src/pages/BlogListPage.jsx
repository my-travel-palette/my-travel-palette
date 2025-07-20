import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";

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
    </div>
  );
}

export default BlogListPage;

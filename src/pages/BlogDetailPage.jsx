import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config/api";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogDetailPage() {
  const [blog, setBlog] = useState(null);

  const { blogId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getBlog();
  }, [blogId]);

  const getBlog = () => {
    axios
      .get(`${BASE_URL}/blogs/${blogId}.json?_embed=tasks`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) =>
        console.log("Error getting blog details from the API...", error)
      );
  };

  const deleteBlog = () => {
    axios
      .delete(`${BASE_URL}/blogs/${blogId}.json`)
      .then(() => {
        navigate("/blogs");
      })
      .catch((error) =>
        console.log("Error deleting blog from the API...", error)
      );
  };

  if(!blog){
    return <div></div>
  }

  return (
    <div>
      <h1>{blog.title}</h1>

      By {" "}
        {blog.author.join(" & ")}


      <p>{blog.date}</p>

      <img src={blog.imageUrl} alt={blog.title} />

      <p>{blog.content}</p>

      <ul>
        {blog.resources.map((resourcesObj, index) => (
          <li key={index}>
            {resourcesObj.title} : {resourcesObj.link}
          </li>
        ))}
      </ul>

      {/* Buttons */}

      <Link to={`/blog/edit/${blogId}`}>
        <button>Edit</button>
      </Link>

      <button onClick={deleteBlog}>Delete</button>

      <Link to={`/my-travels/${blog.travelId}`}>
        <button>Back to blogs</button>
      </Link>
    </div>
  );
}

export default BlogDetailPage;

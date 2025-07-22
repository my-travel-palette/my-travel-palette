import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../config/api";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";

function HtmlRenderer({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

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

  if (!blog) {
    return <div></div>;
  }

  return (
    <div className="p-3">
      <h1 className="text-3xl mb-4 text-center text-teal-700">{blog.title}</h1>
      <div className="text-sm mb-4 text-center text-teal-700">
        by {" " + blog.author.join(" & ") + " • "}
        <span>{new Date(blog.date).toDateString()}</span>
      </div>

      <div className="pl-10">
        <Link to={`/my-travels/${blog.travelId}`} className="text-xl link">
          <i className="fa fa-chevron-left p-2" aria-hidden="true"></i>Back
        </Link>
      </div>

      <img
        className="h-180 w-full pl-40 pr-40 rounded-lg object-cover object-center"
        src={blog.imageUrl}
        alt={blog.title}
      />

      <div className="pl-40 pr-40 pt-6 text-lg text-justify">
        <HtmlRenderer content={blog.content} />
      </div>

      <div className="pl-40 pr-40 pt-6 text-lg text-justify">
        <h1 className="font-bold">Useful links:</h1>
        {blog.resources.map((resourcesObj, index) => (
          <a href={resourcesObj.link} key={index} className="link link-primary">
            <p>{resourcesObj.title}</p>
          </a>
        ))}
      </div>

      {/* Comments Section */}
      <CommentSection blogId={blogId} />

      {/* Buttons */}
      <div className="pl-40 pr-40 pt-6 text-lg text-right flex justify-end gap-4 pt-4">
        <button className="btn btn-error" onClick={deleteBlog}>
          Delete
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate(`/blog/edit/${blogId}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default BlogDetailPage;

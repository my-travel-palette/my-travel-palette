import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";

function BlogListPage() {

    const [blogList, setBlogList] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/blogs.json`)
            .then((response) => {
                const blogsArr = Object.keys(response.data).map((id) => ({
                    id,
                    ...response.data[id],
                }));
                setBlogList(blogsArr);
            })
            .catch((error) =>
                console.log("Error getting project details from the API...", error)
            );
    }, [])

    return (
        <div>
            <h1>Blogs</h1>
            {blogList.map((blog) => {
                return <div key={blog.id}>{blog.title} <img src={blog.imageUrl}></img></div>;
            })}

        </div>
    )
}

export default BlogListPage;

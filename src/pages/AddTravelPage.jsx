import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";

function AddTravelPage() {
  const [imageUrl, setImageUrl] = useState([]);
  const [title, setTitle] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTravel = {
      imageUrl: imageUrl,
      title: title,
    };

    axios
      .post(`${BASE_URL}/travels.json`, newTravel)
      .then((response) => {
        navigate("/my-travels");
        console.log(response.data);
      })
      .catch((e) => console.log("Error adding a new travel...", e));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="enter the title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            placeholder="enter the image URL"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </label>
        <button>Add</button>
      </form>
    </div>
  );
}

export default AddTravelPage;

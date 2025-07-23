import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";
import ImageUpload from "../components/ImageUpload";

function AddTravelPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdding(true);

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
      .catch((e) => {
        console.log("Error adding a new travel...", e);
        alert("Error adding travel. Please try again.");
      })
      .finally(() => {
        setAdding(false);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-center mb-8">
              Add New Travel
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter travel title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Image Upload */}
              <ImageUpload onUploadSuccess={(url) => setImageUrl(url)} />



              {/* Preview */}
              {imageUrl && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Preview</span>
                  </label>
                  <div className="card bg-base-200">
                    <figure className="px-4 pt-4">
                      <img
                        src={imageUrl}
                        alt="Travel preview"
                        className="rounded-lg w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                        }}
                      />
                    </figure>
                    <div className="card-body pt-2">
                      <h3 className="card-title text-lg">{title || "Travel Title"}</h3>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/my-travels")}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none"
                  disabled={adding}
                >
                  {adding ? "Adding..." : "Add Travel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTravelPage;

import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

function TravelListPage() {
  const [travelList, setTravelList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/travels.json`)
      .then((response) => {
        console.log(response.data);
        const travelsArr = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));
        setTravelList(travelsArr);
      })
      .catch((error) =>
        console.log("Error getting travel list page from the API...", error)
      );
  }, []);

  const handleTravelClick = (travelId) => {
    navigate(`/my-travels/${travelId}`);
  };

  const handleAddNewCountry = () => {
    navigate(`/new-travel`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-700 ">Visited places</h1>
      <button onClick={handleAddNewCountry} className="btn bg-teal-700 mb-6 text-white">
        Add New Country
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {travelList.map((travel) => {
          return (
            <div key={travel.id} className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <img
                  src={travel.imageUrl}
                  onClick={() => handleTravelClick(travel.id)}
                />
              </figure>
              <div className="absolute bottom-0 left-1/2 p-6 bg-teal-800 bg-opacity-90 text-white text-center py-3 font-semibold text-sm transform -translate-x-1/2">
                {travel.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TravelListPage;

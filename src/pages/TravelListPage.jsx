import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { Link, useNavigate } from "react-router-dom";

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

  const handleAddNewCountry = () => {
    navigate(`/new-travel`);
  };

  const deleteTravel = (travelId) => {
    axios
      .delete(`${BASE_URL}/travels/${travelId}.json`)
      .then(() => {
        setTravelList(travelList.filter((e) => e.id !== travelId));
      })
      .catch((error) =>
        console.log("Error deleting travels from the API...", error)
      );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-700 ">
        Visited countries
      </h1>
      <div className="p-2">
        <button
          onClick={handleAddNewCountry}
          className="btn bg-teal-700 mb-6 text-white p-5"
        >
          Add New Country
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-5">
        {travelList.map((travel) => {
          return (
            <div key={travel.id} className="card bg-base-300 w-96 shadow-sm">
              <button
                className="btn btn-circle btn-sm absolute top-2 right-2 text-error"
                onClick={() => deleteTravel(travel.id)}
              >
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
              <Link to={`/my-travels/${travel.id}`}>
                <figure className="w-full h-48 overflow-hidden">
                  <img
                    src={travel.imageUrl}
                    alt={travel.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{travel.title}</h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TravelListPage;

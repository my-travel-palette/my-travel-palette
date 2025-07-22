import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { Link } from "react-router-dom";

function TravelListPage() {
  const [travelList, setTravelList] = useState([]);

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
    <div className="p-3">
      <h1 className="text-3xl font-bold mb-4 text-center text-teal-700 ">
        Visited countries
      </h1>
      <div className="p-2 flex justify-between items-center">
        <Link to={`/`} className="btn btn-ghost text-xl">
          <i className="fa fa-chevron-left p-2" aria-hidden="true"></i>Back
        </Link>
        <Link to={`/new-travel`} className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none text-base px-4 py-2">
          <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add New Country
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-5">
        {travelList.map((travel) => {
          return (
            <div key={travel.id} className="card bg-base-300 w-96 shadow-sm m-5">
              <button
                className="btn btn-circle btn-sm absolute top-2 right-2 text-emerald-800"
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

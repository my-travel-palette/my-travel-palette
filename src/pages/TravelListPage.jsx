import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function TravelListPage() {
  const [travelList, setTravelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    setLoading(true);
    setError(null);

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
      .catch((error) => {
        console.log("Error getting travel list page from the API...", error);
        setError("Failed to load travels. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteTravel = (travelId) => {
    axios
      .delete(`${BASE_URL}/travels/${travelId}.json`)
      .then(() => {
        setTravelList(travelList.filter((e) => e.id !== travelId));
      })
      .catch((error) => {
        console.log("Error deleting travels from the API...", error);
        alert("Failed to delete travel. Please try again.");
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Loading travels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="alert alert-error max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            <span>{error}</span>
          </div>
          <button 
            className="btn btn-primary mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-6">
      <div className="mb-8 mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-base-content">
          Explore our destinations
        </h1>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Link to={`/`} className="btn btn-ghost text-xl">
          <i className="fa fa-chevron-left p-2" aria-hidden="true"></i>Back
        </Link>
        {isAdmin && (
          <Link to={`/new-travel`} className="px-4 py-2 text-sm font-medium text-[#5A7D1A] rounded-lg transition-all duration-300 hover:bg-[#d89d20] hover:text-white relative overflow-hidden" style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #5A7D1A, #d89d20) border-box', border: '2px solid transparent' }}>
            <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add New Country
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {travelList.length === 0 ? (
          <div className="col-span-full flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No travels found</h3>
              <p className="text-gray-500 mb-4">Start your journey by adding your first travel destination.</p>
              {isAdmin && (
                <Link to="/new-travel" className="btn text-[#5A7D1A] hover:bg-[#d89d20] hover:text-white rounded-lg relative overflow-hidden" style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #5A7D1A, #d89d20) border-box', border: '2px solid transparent' }}>
                  <i className="fa fa-plus mr-2" aria-hidden="true"></i>Add New Country
                </Link>
              )}
            </div>
          </div>
        ) : (
          travelList.map((travel) => {
            return (
              <div
                key={travel.id}
                className="card bg-base-300 w-full shadow-sm relative overflow-hidden"
              >
                {isAdmin && (
                  <button
                    className="btn btn-circle btn-sm absolute top-2 right-2 text-emerald-800 z-10"
                    onClick={() => deleteTravel(travel.id)}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                )}
                <Link to={`/my-travels/${travel.id}`}>
                  <figure className="w-full h-48 overflow-hidden">
                    <img
                      src={travel.imageUrl}
                      alt={travel.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                      }}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{travel.title}</h2>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default TravelListPage;

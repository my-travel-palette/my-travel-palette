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
        console.log("Error getting project details from the API...", error)
      );
  }, []);

  return (
    <div>
      
      <h1>Travels</h1>
      {travelList.map((travel) => {
        return (
          <div key={travel.id}>
            <Link to={`/my-travels/${travel.id}`}>
              <img 
                src={travel.imageUrl} 
              />
            </Link>
            <div>{travel.title}</div>
          </div>
        );
      })}
      
    </div>
  );
}

export default TravelListPage;
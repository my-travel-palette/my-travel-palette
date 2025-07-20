import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
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
        console.log("Error getting project details from the API...", error)
      );
  }, []);

  const handleTravelClick = (travelId) => {
    navigate(`/my-travels/${travelId}`);
  };

  return (
    <div>
      <h1>Travels</h1>
      {travelList.map((travel) => {
        return (
          <div key={travel.id}>
            <img 
              src={travel.imageUrl} 
              onClick={() => handleTravelClick(travel.id)}
            />
            <div>{travel.title}</div>
          </div>
        );
      })}
      
    </div>
  );
}

export default TravelListPage;

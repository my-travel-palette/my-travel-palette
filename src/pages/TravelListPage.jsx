import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
import { useState, useEffect } from "react";
import axios from "axios";

function TravelListPage() {
  const [travelList, setTravelList] = useState([]);

  const BASE_URL =
    "https://my-travel-palette-default-rtdb.europe-west1.firebasedatabase.app/";

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
      <Header />
      <Navbar />
      <ImageSlider />
      <h1>Travels</h1>
      {travelList.map((travel)=>{
        return <div key={travel.id}>{travel.title}</div>
      })}
      <Footer />
    </div>
  );
}

export default TravelListPage;

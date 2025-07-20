import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";

function HomePage() {
  return (
    <div>
      <Header />
      <Navbar />
      <ImageSlider />
      <h1>Home Page</h1>
      <div>
        <p>About Project: </p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Tempore facere dolorem officiis natus, odit fugiat labore asperiores
        atque repellat. Corrupti ipsam quia accusamus quis consequatur.
        Laboriosam voluptatem pariatur eos eaque?
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;

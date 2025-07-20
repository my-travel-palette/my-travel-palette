import "./index.css"
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TravelListPage from "./pages/TravelListPage";
import AboutMePage from "./pages/AboutMePage";
import BlogListPage from "./pages/BlogListPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

  return (
    <>

     
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-travels/" element={<TravelListPage />} />
        <Route path="/my-travels/:id" element={<BlogListPage />} />
        <Route path="/about-me" element={<AboutMePage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App

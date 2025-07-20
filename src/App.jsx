import "./index.css"
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TravelListPage from "./pages/TravelListPage";
import AboutMePage from "./pages/AboutMePage";
import BlogListPage from "./pages/BlogListPage";

function App() {

  return (
    <>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-travels/" element={<TravelListPage />} />
        <Route path="/my-travels/:id" element={<BlogListPage />} />
        <Route path="/about-me" element={<AboutMePage />} />
      </Routes>

    </>
  )
}

export default App

import "./index.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TravelListPage from "./pages/TravelListPage";
import AboutUsPage from "./pages/AboutMePage";
import BlogListPage from "./pages/BlogListPage";
import Footer from "./components/Footer";
import BlogDetailPage from "./pages/BlogDetailPage";
import Header from "./components/Header";
import AddTravelPage from "./pages/AddTravelPage";
import AddBlogPage from "./pages/AddBlogPage";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
  
  return (
    <>
      <Header />
      <Navbar />
      <hr/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-travels/" element={<TravelListPage />} />
        <Route path="/my-travels/:travelId" element={<BlogListPage />} />
        <Route path="/about-me" element={<AboutUsPage />} />
        <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
        <Route path="/new-travel" element={<AddTravelPage />} />
        <Route path="/add-blog" element={<AddBlogPage />} />
        <Route path="/blog/edit/:blogId" element={<AddBlogPage />} />
         <Route path="/sign-up" element={<SignUp />} />
         <Route path="/log-in" element={<LogIn />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

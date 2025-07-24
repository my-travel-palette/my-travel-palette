import "./index.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TravelListPage from "./pages/TravelListPage";
import AboutUsPage from "./pages/AboutUsPage";
import BlogListPage from "./pages/BlogListPage";
import Footer from "./components/Footer";
import BlogDetailPage from "./pages/BlogDetailPage";
import Header from "./components/Header";
import AddTravelPage from "./pages/AddTravelPage";
import AddBlogPage from "./pages/AddBlogPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ProfilePage from "./pages/ProfilePage";
import BookmarksPage from "./pages/BookmarksPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-travels/" element={<TravelListPage />} />
          <Route path="/my-travels/:travelId" element={<BlogListPage />} />
          <Route path="/about-me" element={<AboutUsPage />} />
          <Route path="/blogs/:blogId" element={<BlogDetailPage />} />
          <Route path="/new-travel" element={<AddTravelPage />} />
          <Route path="/add-blog" element={<AddBlogPage />} />
          <Route path="/add-blog/:travelId" element={<AddBlogPage />} />
          <Route path="/blog/edit/:blogId" element={<AddBlogPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

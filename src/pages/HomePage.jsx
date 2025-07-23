import ImageSlider from "../components/ImageSlider";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteBlogs = () => {
      axios.get(`${BASE_URL}/blogs.json`)
        .then((response) => {
          if (response.data) {
            const blogsArr = Object.keys(response.data).map((id) => ({
              id,
              ...response.data[id],
            }));
            
            const validBlogs = blogsArr.filter(blog => 
              blog.title && 
              blog.description && 
              blog.imageUrl && 
              blog.title.trim() !== '' && 
              blog.description.trim() !== ''
            );
            
            const shuffled = validBlogs.sort(() => 0.5 - Math.random());
            setFavoriteBlogs(shuffled.slice(0, 3));
          }
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchFavoriteBlogs();
  }, []);

  const handleReadMore = (blogId) => {
    navigate(`/blogs/${blogId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <ImageSlider />
        </div>

        <div className="bg-gradient-to-r from-[#5a7d1a] via-[#d89d20] to-[#9d7636] py-3 mb-6 sm:mb-8"></div>

        <div className="bg-white rounded-box shadow-sm border border-gray-100 my-6 sm:my-8 p-6 sm:p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
              <div className="w-full lg:w-1/3 order-2 lg:order-1 lg:-ml-8">
                <div className="relative">
                  <img 
                    src="https://res.cloudinary.com/dukamnpgl/image/upload/v1753303351/i_have_a_blog_web_site_its_name_is_my_travel_palette_please_create_a_photo_about_this._create_a_palette_and_add_to_travel_images_like_bubbles._dont_add_any_text_to_image._color_palette__d89d20_3E5F44_Each_bubble_should_contain_a_travel_photo_fr_a57evh.jpg" 
                    alt="Travel Palette" 
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>

              <div className="w-full lg:w-2/3 order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Welcome to <span className="text-[#d89d20]" style={{ fontFamily: 'Dancing Script, cursive' }}>My Travel Palette!</span>
                </h2>
                
                <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-base sm:text-lg">
                    This blog is more than just about destinations. It is a personal
                    diary of the skies we have admired, the streets we have wandered,
                    and the cultures that have shaped us. Each trip adds a brushstroke
                    to the canvas of our lives — a memory, a feeling, a moment worth
                    remembering.
                  </p>

                  <p className="text-base sm:text-lg">
                    We travel to explore, to feel alive, and to connect — with people,
                    with places, and with ourselves. Through this blog, we invite you to
                    travel with us: to see what we see, feel what we feel, and perhaps
                    even be inspired to create your own travel palette.
                  </p>

                  <div className="flex items-center justify-center lg:justify-start gap-3 text-[#d89d20] font-medium mt-6 sm:mt-8">
                    <span className="text-base sm:text-lg">Thank you for being here with us!</span>
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    — Sevda & Kateryna
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#9d7636] via-[#d89d20] to-[#5a7d1a] py-3 mb-4"></div>
        
        <div className="bg-white rounded-box shadow-lg my-6 sm:my-8 p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Explore Our Blogs</h3>
            <p className="text-sm sm:text-base text-gray-600">Discover our most cherished travel stories</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-8 sm:py-12">
              <span className="loading loading-spinner loading-lg text-green-600"></span>
            </div>
          ) : favoriteBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
              {favoriteBlogs.map((blog) => (
                <div key={blog.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow w-full">
                  <figure className="h-32 sm:h-40 md:h-48">
                    <img 
                      src={blog.imageUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                      }}
                    />
                  </figure>
                  <div className="card-body p-4 sm:p-6">
                    <h4 className="card-title text-base sm:text-lg">{blog.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{blog.description}</p>
                    <div className="card-actions justify-end mt-4">
                      <button 
                        className="btn btn-sm btn-outline text-[#d89d20] border-[#d89d20] hover:bg-[#d89d20] hover:text-white"
                        onClick={() => handleReadMore(blog.id)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-500 text-sm sm:text-base">No blogs available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

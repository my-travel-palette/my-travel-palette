import { useState, useEffect } from "react";

const images = [
  "https://cdn.outsideonline.com/wp-content/uploads/2023/09/foliage-crestedbutte-caleb-jack-unsplash_h.jpg",
  "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2023/01/75047305-3EFB-4A81-8665-42A5C96B968F-1280x640.jpeg",
  "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2022/04/shutterstock_463504133-1280x640.jpg",
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setImageError(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative w-full">
      {imageError ? (
        <div className="rounded-xl w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <p className="text-gray-500 text-sm sm:text-base">Image not available</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt="Travel"
            className="rounded-xl w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] object-cover"
            onError={handleImageError}
          />

          {/* Quote overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#9d7636]/90 via-[#9d7636]/70 to-transparent p-4 sm:p-6 lg:p-8">
            <div className="text-center text-white">
              <div className="flex items-center justify-center mb-2 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <blockquote className="text-sm sm:text-lg md:text-xl lg:text-2xl font-light italic leading-relaxed mb-2 sm:mb-4 text-white drop-shadow-lg">
                "These are the colors of our heart – the places we've traveled, the
                skies we've memorized, and the moments that have stayed in our
                heart.<br />
                With each trip we paint a little more of our world."
              </blockquote>
              <div className="text-white text-xs sm:text-sm md:text-base font-medium drop-shadow-lg">
                — Sevda & Kateryna
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-6 transform -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-lg flex items-center justify-center transition-all duration-200 z-10"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-6 transform -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-lg flex items-center justify-center transition-all duration-200 z-10"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
export default ImageSlider;

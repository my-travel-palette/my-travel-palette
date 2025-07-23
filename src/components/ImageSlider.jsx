import { useState } from "react";

const images = [
  "https://cdn.outsideonline.com/wp-content/uploads/2023/09/foliage-crestedbutte-caleb-jack-unsplash_h.jpg",
  "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2023/01/75047305-3EFB-4A81-8665-42A5C96B968F-1280x640.jpeg",
  "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2022/04/shutterstock_463504133-1280x640.jpg",
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

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
        <div className="rounded-xl w-full h-[60vh] bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-500">Image not available</p>
          </div>
        </div>
      ) : (
        <img
          src={images[currentIndex]}
          alt="Travel"
          className="rounded-xl w-full h-[40vh] md:h-[60vh] object-cover"
          onError={handleImageError}
        />
      )}
      {/* Left arrow */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-1 md:p-2 text-sm md:text-base shadow hover:bg-gray-200"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-1 md:p-2 text-sm md:text-base shadow hover:bg-gray-200"
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
}
export default ImageSlider;

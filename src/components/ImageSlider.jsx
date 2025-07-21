import { useState } from "react";

const images = [
  "https://cdn.outsideonline.com/wp-content/uploads/2023/09/foliage-crestedbutte-caleb-jack-unsplash_h.jpg",
  "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2023/01/75047305-3EFB-4A81-8665-42A5C96B968F-1280x640.jpeg",
  "https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2022/04/shutterstock_463504133-1280x640.jpg",
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full">
      <img
        src={images[currentIndex]}
        alt="Travel"
        className="rounded-xl w-full h-[60vh] object-cover"
      />
      {/* Left arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-2 shadow hover:bg-gray-200"
      >
        ❮
      </button>
      {/* Right arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-700 rounded-full p-2 shadow hover:bg-gray-200"
      >
        ❯
      </button>
    </div>
  );
}

export default ImageSlider;

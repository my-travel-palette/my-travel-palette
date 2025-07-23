import ImageSlider from "../components/ImageSlider";

function HomePage() {
  return (
    <div className="px-4 md:px-8">
        <ImageSlider />
        <div className="bg-base-200 p-6 rounded-lg shadow-md text-base-content font-sans leading-relaxed text-lg max-w-3xl mx-auto mt-8">
          <p className="mb-4">
            Welcome to{" "}
            <span className="font-bold text-emerald-800">
              My Travel Palette
            </span>{" "}
            — a place where <span className="font-semibold">Sevda</span> and{" "}
            <span className="font-semibold">Kateryna</span> share their
            journeys, colors, and stories from around the world.
          </p>

          <p className="mb-4">
            This blog is more than just about destinations. It is a personal
            diary of the skies we have admired, the streets we have wandered,
            and the cultures that have shaped us. Each trip adds a brushstroke
            to the canvas of our lives — a memory, a feeling, a moment worth
            remembering.
          </p>

          <p className="mb-4">
            We travel to explore, to feel alive, and to connect — with people,
            with places, and with ourselves. Through this blog, we invite you to
            travel with us: to see what we see, feel what we feel, and perhaps
            even be inspired to create your own travel palette.
          </p>

          <p className="mt-6 font-semibold text-emerald-800 flex items-center">
            <span>Thank you for being here with us 🌍</span>
            <span className="ml-2 font-normal italic">— Sevda & Kateryna</span>
          </p>
        </div>
      </div>
  );
}

export default HomePage;

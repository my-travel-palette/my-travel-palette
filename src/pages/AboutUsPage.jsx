import { Link } from "react-router-dom";

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-8 text-teal-700">
              About Us
            </h1>

            {/* Project Team */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-teal-600">
                Project Team
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title text-lg">Sevda Kahraman</h3>
                    <p className="text-sm text-gray-600">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h3 className="card-title text-lg">Kateryna Soloviova</h3>
                    <p className="text-sm text-gray-600">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-teal-600">
                About My Travel Palette
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                My Travel Palette is a personal travel blog platform where we
                share our journeys, experiences, and memories from around the
                world. It's more than just a blog - it's a digital canvas where
                we paint the stories of our adventures, the colors of different
                cultures, and the moments that have shaped our perspectives.
              </p>
              <p className="text-lg leading-relaxed">
                Through this platform, we invite you to travel with us, see what
                we see, feel what we feel, and perhaps be inspired to create
                your own travel palette.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-teal-600">
                Technology Stack
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Frontend</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      React 19.1.0
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      React Router DOM 7.7.0
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      Tailwind CSS 4.1.11
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      DaisyUI 5.0.46
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      TipTap Rich Text Editor
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      Lucide React Icons
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Backend & Services
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      Firebase Realtime Database
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      Firebase Authentication
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      Firebase Firestore
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      Axios for API calls
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      Vite Build Tool
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-teal-600">
                Key Features
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg">Travel Management</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Add and manage travel destinations</li>
                        <li>• Upload travel images</li>
                        <li>• Organize travels by countries</li>
                      </ul>
                    </div>
                  </div>
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg">Blog System</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Rich text editor for blog posts</li>
                        <li>• Image and link embedding</li>
                        <li>• Resource links management</li>
                        <li>• Edit and delete functionality</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg">User Experience</h3>
                      <ul className="text-sm space-y-1">
                        <li>• Responsive design</li>
                        <li>• Modern UI with DaisyUI</li>
                        <li>• Image slider on homepage</li>
                        <li>• Navigation between pages</li>
                      </ul>
                    </div>
                  </div>
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg">Authentication</h3>
                      <ul className="text-sm space-y-1">
                        <li>• User registration and login</li>
                        <li>• Role-based access control</li>
                        <li>• Secure authentication with Firebase</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Goals */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-teal-600">
                Project Goals
              </h2>
              <div className="bg-base-200 p-6 rounded-lg">
                <p className="text-lg leading-relaxed mb-4">
                  Our goal with My Travel Palette is to create a platform that
                  goes beyond traditional travel blogging. We wanted to build
                  something that captures not just the destinations, but the
                  emotions, colors, and personal growth that comes with travel.
                </p>
                <p className="text-lg leading-relaxed">
                  This project demonstrates our skills in modern web
                  development, from frontend design to backend integration,
                  while creating a meaningful platform for sharing travel
                  stories and inspiring others to explore the world.
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center">
              <Link
                to="/"
                className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;

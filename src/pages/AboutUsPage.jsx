import { Link } from "react-router-dom";

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-8 text-[#5a7d1a]">
              About Us
            </h1>

            {/* Project Team */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-[#5a7d1a]">
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
              <h2 className="text-2xl font-semibold mb-4 text-[#5a7d1a]">
                About My Travel Palette
              </h2>
              <p className="text-lg leading-relaxed mb-4">
                My Travel Palette is a full-stack web application developed as
                part of our Web Development Bootcamp at Ironhack. Built with
                modern technologies, it serves as a digital travel blog platform
                where users can document, manage, and share their travel
                experiences.
              </p>
              <p className="text-lg leading-relaxed">
                This project showcases our ability to architect scalable,
                responsive web applications using cutting-edge frontend and
                backend tools. While the theme is travel storytelling, our real
                focus was on building a feature-rich, technically sound platform
                using industry-standard tools and best practices.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#5a7d1a] flex items-center gap-2">
                <i className="fa fa-laptop text-base md:text-xl"></i>
                Technologies Used
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-neutral">
                        <i className="fa fa-desktop text-base md:text-lg text-[#5a7d1a]"></i>
                        Frontend
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          React 19.1.0
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          Tailwind CSS 4.1.11
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          DaisyUI 5.0.46
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          TipTap Rich Text Editor
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          Lucide React Icons
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-neutral">
                        <i className="fa fa-code text-base md:text-lg text-[#5a7d1a]"></i>
                        Backend & Services
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          Firebase Realtime Database
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          Firebase Authentication
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          Firebase Firestore
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          Axios for API calls
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          Vite Build Tool
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#5a7d1a] flex items-center gap-2">
                <i className="fa fa-cogs text-base md:text-xl"></i>
                Key Features
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg flex items-center gap-2">
                        <i className="fa fa-globe text-base md:text-lg text-[#5a7d1a]"></i>
                        Travel Management
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>
                          Add and manage travel destinations
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Upload travel images
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Organize travels by countries
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Display favourite blogs
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg flex items-center gap-2">
                        <i className="fa fa-pencil-square-o text-base md:text-lg text-[#5a7d1a]"></i>
                        Blog System
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Rich text editor for blog posts
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Image and link embedding
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Resource links management
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Edit and delete functionality
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg flex items-center gap-2">
                        <i className="fa fa-user text-base md:text-lg text-[#5a7d1a]"></i>
                        User Experience
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Responsive design
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Modern UI with DaisyUI
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Image slider on homepage
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Navigation between pages
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h3 className="card-title text-lg flex items-center gap-2">
                        <i className="fa fa-lock text-base md:text-lg text-[#5a7d1a]"></i>
                        Authentication
                      </h3>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          User registration and login
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Role-based access control
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-neutral rounded-full mr-3"></span>{" "}
                          Secure authentication with Firebase
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Goals */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#5a7d1a] flex items-center gap-2">
                <i className="fa fa-bullseye text-base md:text-xl"></i>
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

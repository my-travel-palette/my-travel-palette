import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-base-200 flex items-center justify-center px-4 pt-8 pb-16">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Icon */}
        <div className="mb-6">
          <div className="relative">
            <div className="text-6xl font-bold text-base-content/20">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl text-[#5A7D1A]">
                <i className="fa fa-map-marker"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-base-content mb-3">
            Oops! Page Not Found
          </h1>
          <p className="text-base-content/70 text-base mb-4">
            The page you're looking for seems to have wandered off on its own adventure.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link 
            to="/" 
            className="btn w-full max-w-xs text-white border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-lg"
            style={{ 
              background: 'linear-gradient(135deg, #5A7D1A 0%, #6B8A2A 50%, #d89d20 100%)',
              boxShadow: '0 4px 15px rgba(90, 125, 26, 0.3)'
            }}
          >
            <i className="fa fa-home mr-2"></i>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
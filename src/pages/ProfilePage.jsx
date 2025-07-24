import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/log-in");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="bg-base-200 flex items-start justify-center px-4 pt-16 pb-0">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Profile
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-sm text-gray-900">{currentUser.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{currentUser.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <p className="mt-1 text-sm text-gray-900 capitalize">
              {currentUser.role}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-[#5A7D1A] mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/bookmarks"
              className="flex items-center p-3 bg-[#d89d20]/10 rounded-lg hover:bg-[#d89d20]/20 transition-colors"
            >
              <i className="fa fa-bookmark text-[#d89d20] mr-3"></i>
              <div>
                <p className="font-medium text-gray-900">My Bookmarks</p>
                <p className="text-sm text-gray-500">
                  View your saved blog posts
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="btn bg-[#5A7D1A] hover:bg-[#4a6d15] text-white border-none w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

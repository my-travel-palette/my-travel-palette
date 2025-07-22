import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 text-sm text-gray-900">{currentUser.name}</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{currentUser.email}</p>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <p className="mt-1 text-sm text-gray-900 capitalize">{currentUser.role}</p>
                    </div>
                </div>
                
                <div className="mt-6">
                    <button 
                        onClick={() => navigate("/")}
                        className="btn bg-emerald-800 hover:bg-emerald-700 text-white border-none w-full"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage; 
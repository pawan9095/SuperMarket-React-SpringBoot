import { Camera, Edit2, LogOut, Shield, TrendingUp, Mail, Phone, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 rounded-2xl"></div>
      
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header background with sharp top corners */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl"></div>
        
        <div className="relative px-6 md:px-8 pb-6">
          {/* Profile info */}
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-20">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-white">
                  {user.name?.charAt(0) || user.email.charAt(0)}
                </span>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow group-hover:scale-110 border border-gray-200">
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* User details */}
            <div className="mt-4 md:mt-0 md:ml-6 md:mb-4 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200">
                      <Mail className="w-3 h-3" /> {user.email}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200">
                      <Shield className="w-3 h-3" /> Verified Account
                    </span>
                  </div>
                </div>

                {/* Action buttons - Logout button with white background */}
                <div className="flex gap-3 mt-4 md:mt-0">
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 border border-blue-600">
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-lg border border-gray-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>

              {/* Stats - Fixed border edges */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {/* Joined */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Joined
                  </div>
                  <div className="font-semibold text-gray-900 text-lg">4 Jan 2024</div>
                </div>
                
                {/* Orders */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Orders</div>
                  <div className="font-semibold text-gray-900 text-lg">12 Completed</div>
                </div>
                
                {/* Reviews */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Reviews</div>
                  <div className="font-semibold text-gray-900 text-lg">8 Written</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
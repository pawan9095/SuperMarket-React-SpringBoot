import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Edit2, LogOut, Mail, Shield, Calendar } from "lucide-react";

export default function ProfileHeader({ user }) {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(
    user?.profileImage
      ? `http://localhost:8080/uploads/profile-images/${user.profileImage}`
      : null
  );

  // 🔥 FIX: upload image to backend
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // instant preview
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", user.email);

    try {
      const res = await fetch(
        "http://localhost:8080/api/users/profile-image",
        {
          method: "POST",
          body: formData,
        }
      );

      const updatedUser = await res.json();

      // update localStorage so image persists
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  return (
    <div className="relative mb-8">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

        {/* Gradient Header */}
        <div className="h-28 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"></div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 -mt-14">

            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-white overflow-hidden flex items-center justify-center text-white text-2xl font-bold">
                {preview ? (
                  <img
                    src={preview}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  user.name?.charAt(0) || "U"
                )}
              </div>

              {/* 🔥 FIXED INPUT */}
              <input
                type="file"
                id="profileImage"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />

              <button
                type="button"
                onClick={() =>
                  document.getElementById("profileImage").click()
                }
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full border shadow"
              >
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Info + Actions */}
            <div className="flex-1 flex flex-col gap-4">

              {/* Email + Verified + Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow text-blue-600 font-medium text-sm">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </span>

                  <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <Shield className="w-4 h-4" /> Verified
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/profile/edit")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-xl">
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Joined
                  </div>
                  <div className="font-semibold text-gray-900">
                    4 Jan 2024
                  </div>
                </div>

                <div className="p-4 border rounded-xl">
                  <div className="text-sm text-gray-500">Orders</div>
                  <div className="font-semibold text-gray-900">12 Completed</div>
                </div>

                <div className="p-4 border rounded-xl">
                  <div className="text-sm text-gray-500">Reviews</div>
                  <div className="font-semibold text-gray-900">8 Written</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProfileHeader from "./ProfileHeader";
import ProfileSidebar from "./ProfileSidebar";

// Tabs
import Overview from "./tabs/Overview";
import Orders from "./tabs/Orders";
import Address from "./tabs/Address";
import Wishlist from "./tabs/Wishlist";
import Payments from "./tabs/Payments";
import Reviews from "./tabs/Reviews";
import Notifications from "./tabs/Notifications";
import Security from "./tabs/Security";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser?.email) {
      navigate("/login");
      return;
    }

    // 🔥 ALWAYS FETCH LATEST USER FROM DB
    fetch(`http://localhost:8080/api/users/me?email=${storedUser.email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((dbUser) => {
        localStorage.setItem("user", JSON.stringify(dbUser));
        setUser(dbUser);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("user");
        navigate("/login");
      });
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="pt-24 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <Overview user={user} />;
      case "orders":
        return <Orders user={user} />;
      case "address":
        return <Address user={user} />;
      case "wishlist":
        return <Wishlist user={user} />;
      case "payments":
        return <Payments user={user} />;
      case "reviews":
        return <Reviews user={user} />;
      case "notifications":
        return <Notifications user={user} />;
      case "security":
        return <Security user={user} />;
      default:
        return <Overview user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="pt-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ProfileHeader user={user} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ProfileSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            <div className="lg:col-span-3">
              <div className="animate-fadeIn">{renderTab()}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

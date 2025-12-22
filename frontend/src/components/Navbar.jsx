import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, Package, HelpCircle, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const menuItems = [
    { icon: <User size={18} />, label: "My Account", action: () => navigate("/profile") },
    { icon: <Package size={18} />, label: "My Orders", action: () => navigate("/orders") },
    { icon: <ShoppingCart size={18} />, label: "My Cart", action: () => navigate("/cart") },
    { icon: <HelpCircle size={18} />, label: "Support", action: () => navigate("/support") },
    { 
      icon: <LogOut size={18} />, 
      label: "Logout", 
      action: logout,
      className: "text-red-600 hover:text-red-700 hover:bg-red-50"
    }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 to-black text-white shadow-lg">
      
      {/* Left: Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition-all"
        onClick={() => navigate("/")}
      >
        SuperMarket
      </h1>

      {/* Center: Search Bar */}
      <form 
        onSubmit={handleSearch}
        className="flex-1 max-w-2xl mx-8"
      >
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="w-full px-4 py-2.5 pl-12 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
          <button 
            type="submit"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Search size={20} />
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </form>

      {/* Right: User Actions */}
      {user ? (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg group-hover:from-cyan-400 group-hover:to-blue-500 transition-all">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium hidden md:inline-block">
              Hi, {user.email.split('@')[0]}
            </span>
          </div>

          {/* Enhanced Dropdown with hover effects */}
          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-white text-black rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
              {/* User Info */}
              <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-lg">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold truncate">{user.email}</p>
                    <p className="text-sm text-gray-600">Welcome back!</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200 group ${item.className || ""}`}
                  >
                    <span className="text-gray-600 group-hover:text-cyan-600 transition-colors">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
              </div>

              {/* Bottom Stats */}
              <div className="px-6 py-3 bg-gray-50 border-t text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Orders: 12</span>
                  <span>Cart: 3 items</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-white transition-all duration-300 font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg"
          >
            Signup
          </button>
        </div>
      )}
    </nav>
  );
}

// Add this to your global CSS for animation
// @keyframes fadeIn {
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-fadeIn {
//   animation: fadeIn 0.2s ease-out;
// }npm 
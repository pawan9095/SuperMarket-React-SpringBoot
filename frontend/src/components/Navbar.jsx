import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  MapPin,
  ChevronDown,
  User,
  LogOut
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* ================= TOP NAVBAR ================= */}
      <div className="flex items-center gap-4 px-4 py-2 bg-[#131921] text-white">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer hover:border hover:border-white px-2 py-1"
        >
          Super<span className="text-orange-400">Market</span>
        </div>

        {/* Delivery Location */}
        <div className="hidden md:flex items-center gap-1 cursor-pointer hover:border hover:border-white px-2 py-1">
          <MapPin size={18} />
          <div className="text-xs leading-tight">
            <p className="text-gray-300">Delivering to</p>
            <p className="font-bold">Delhi 110001</p>
          </div>
        </div>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/search?q=${searchQuery}`);
            }
          }}
          className="flex flex-1 max-w-4xl"
        >
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products"
            className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
          />
          <button className="bg-orange-400 px-4 rounded-r-md hover:bg-orange-500">
            <Search className="text-black" />
          </button>
        </form>

        {/* Account */}
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setOpen(!open)}
              className="cursor-pointer hover:border hover:border-white px-2 py-1"
            >
              <p className="text-xs">Hello, {user.email.split("@")[0]}</p>
              <p className="font-bold flex items-center gap-1">
                Account & Lists <ChevronDown size={14} />
              </p>
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded shadow-lg">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <User size={16} /> My Account
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:border hover:border-white px-2 py-1"
          >
            <p className="text-xs">Hello, sign in</p>
            <p className="font-bold">Account & Lists</p>
          </div>
        )}

        {/* Orders */}
        <div
          onClick={() => navigate("/orders")}
          className="hidden md:block cursor-pointer hover:border hover:border-white px-2 py-1"
        >
          <p className="text-xs">Returns</p>
          <p className="font-bold">& Orders</p>
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="flex items-center gap-1 cursor-pointer hover:border hover:border-white px-2 py-1"
        >
          <ShoppingCart />
          <span className="font-bold">Cart</span>
        </div>
      </div>

      {/* ================= BOTTOM NAVBAR ================= */}
      <div className="flex items-center gap-4 px-4 py-2 bg-[#232f3e] text-white text-sm">
        {[
          "All",
          "Fresh",
          "MX Player",
          "Sell",
          "Best Sellers",
          "Mobiles",
          "Today's Deals",
          "Customer Service",
          "Prime",
          "Electronics",
          "Home & Kitchen"
        ].map((item) => (
          <span
            key={item}
            className="cursor-pointer hover:border hover:border-white px-2 py-1"
          >
            {item}
          </span>
        ))}
      </div>
    </header>
  );
}

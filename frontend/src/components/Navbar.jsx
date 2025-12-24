import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  ChevronDown,
  User,
  LogOut,
  Sun,
  Moon,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const dropdownRef = useRef(null);

  /* ===== THEME HANDLING ===== */
  useEffect(() => {
    const currentTheme = themes[theme];
    
    // Apply theme to document root
    document.documentElement.style.setProperty('--nav-bg', currentTheme.navBg);
    document.documentElement.style.setProperty('--nav-border', currentTheme.navBorder);
    document.documentElement.style.setProperty('--text', currentTheme.text);
    document.documentElement.style.setProperty('--accent', currentTheme.accent);
    document.documentElement.style.setProperty('--accent-hover', currentTheme.accentHover);
    document.documentElement.style.setProperty('--dropdown-bg', currentTheme.dropdownBg);
    
    // Set data-theme attribute
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ===== THEME DEFINITIONS ===== */
  const themes = {
    light: {
      navBg: "#ffffff",
      navBorder: "#e5e7eb",
      text: "#1f2937",
      accent: "#3b82f6",
      accentHover: "#2563eb",
      dropdownBg: "#ffffff"
    },
    dark: {
      navBg: "#1f2937",
      navBorder: "#374151",
      text: "#f9fafb",
      accent: "#8b5cf6",
      accentHover: "#7c3aed",
      dropdownBg: "#374151"
    },
    brand: {
      navBg: "#0f766e",
      navBorder: "#0d9488",
      text: "#f0fdfa",
      accent: "#fbbf24",
      accentHover: "#f59e0b",
      dropdownBg: "#134e4a"
    }
  };

  /* ===== CLOSE DROPDOWN ===== */
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
    setOpen(false);
    navigate("/");
  };

  const getThemeIcon = () => {
    switch(theme) {
      case "dark": return <Moon size={20} />;
      case "brand": return <Sparkles size={20} />;
      default: return <Sun size={20} />;
    }
  };

  const getNextTheme = () => {
    const themeOrder = ["light", "dark", "brand"];
    const currentIndex = themeOrder.indexOf(theme);
    return themeOrder[(currentIndex + 1) % themeOrder.length];
  };

  return (
    <header>
      {/* ================= TOP NAV ================= */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b md:px-6"
        style={{
          backgroundColor: 'var(--nav-bg)',
          color: 'var(--text)',
          borderColor: 'var(--nav-border)',
          height: '64px'
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src="/trolley.png" alt="SuperMarket" className="h-8 w-8" />
          <span className="text-xl font-bold">
            Super<span style={{ color: "var(--accent)" }}>Market</span>
          </span>
        </div>

        {/* Search (hidden on mobile) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/search?q=${searchQuery}`);
            }
          }}
          className="hidden md:flex flex-1 max-w-md mx-4"
        >
          <div 
            className="flex w-full rounded-full overflow-hidden border transition-all"
            style={{
              borderColor: 'var(--nav-border)',
              backgroundColor: theme === 'dark' ? '#374151' : '#ffffff'
            }}
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-sm outline-none"
              style={{
                color: theme === 'dark' ? '#f9fafb' : '#1f2937',
                backgroundColor: 'transparent'
              }}
            />
            <button
              type="submit"
              className="px-4 transition-colors hover:opacity-90"
              style={{ 
                backgroundColor: "var(--accent)",
                color: theme === 'brand' ? '#1f2937' : '#ffffff'
              }}
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          {/* Theme Switch */}
          <button
            onClick={() => setTheme(getNextTheme())}
            className="p-2 rounded-full hover:opacity-80 transition-all"
            style={{ 
              backgroundColor: "var(--accent)",
              color: theme === 'brand' ? '#1f2937' : '#ffffff'
            }}
            title={`Change to ${getNextTheme()} theme`}
          >
            {getThemeIcon()}
          </button>

          {/* Account */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-lg"
                style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)' }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--accent)", color: "#ffffff" }}
                >
                  {user.email.charAt(0).toUpperCase()}
                </div>
              </div>

              {open && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl border overflow-hidden"
                  style={{
                    backgroundColor: 'var(--dropdown-bg)',
                    color: 'var(--text)',
                    borderColor: 'var(--nav-border)'
                  }}
                >
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="w-full px-4 py-3 hover:opacity-80 flex items-center gap-3 transition-colors border-b text-sm"
                    style={{ borderColor: 'var(--nav-border)' }}
                  >
                    <User size={16} /> 
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-3 hover:opacity-80 flex items-center gap-3 transition-colors text-sm"
                    style={{ color: '#ef4444' }}
                  >
                    <LogOut size={16} /> 
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="font-semibold px-4 py-2 rounded-lg transition-colors hover:opacity-80 text-sm"
              style={{ 
                backgroundColor: "var(--accent)",
                color: theme === 'brand' ? '#1f2937' : '#ffffff'
              }}
            >
              Login / Sign Up
            </button>
          )}

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 cursor-pointer font-semibold p-2 rounded-lg hover:opacity-80 transition-opacity text-sm"
            style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)' }}
          >
            <ShoppingCart size={20} />
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM NAV ================= */}
      <div
        className="flex gap-4 px-4 py-2 font-medium text-sm overflow-x-auto md:px-6 md:gap-6"
        style={{
          backgroundColor: 'var(--nav-bg)',
          color: 'var(--text)',
          borderBottom: `1px solid var(--nav-border)`,
          height: '56px',
          alignItems: 'center'
        }}
      >
        {[
          "All",
          "Fresh",
          "Best Sellers",
          "Mobiles",
          "Deals",
          "Electronics",
          "Home & Kitchen"
        ].map((item) => (
          <span
            key={item}
            onClick={() => navigate(`/category/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`)}
            className="cursor-pointer transition-all duration-200 hover:scale-105 relative group whitespace-nowrap"
          >
            {item}
            <span 
              className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
              style={{ backgroundColor: "var(--accent)" }}
            ></span>
          </span>
        ))}
      </div>
    </header>
  );
}
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Sun,
  Moon,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ SAFE localStorage read (prevents crash)
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dropdownRef = useRef(null);

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

  /* ===== APPLY THEME ===== */
  useEffect(() => {
    const currentTheme = themes[theme];

    document.documentElement.style.setProperty("--nav-bg", currentTheme.navBg);
    document.documentElement.style.setProperty("--nav-border", currentTheme.navBorder);
    document.documentElement.style.setProperty("--text", currentTheme.text);
    document.documentElement.style.setProperty("--accent", currentTheme.accent);
    document.documentElement.style.setProperty("--accent-hover", currentTheme.accentHover);
    document.documentElement.style.setProperty("--dropdown-bg", currentTheme.dropdownBg);

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ===== CLOSE DROPDOWN ON OUTSIDE CLICK ===== */
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
    navigate("/login");
  };

  const getThemeIcon = () => {
    if (theme === "dark") return <Moon size={20} />;
    if (theme === "brand") return <Sparkles size={20} />;
    return <Sun size={20} />;
  };

  const getNextTheme = () => {
    const order = ["light", "dark", "brand"];
    return order[(order.indexOf(theme) + 1) % order.length];
  };

  return (
    <header>
      <div
        className="flex items-center justify-between px-4 py-3 border-b md:px-6"
        style={{
          backgroundColor: "var(--nav-bg)",
          color: "var(--text)",
          borderColor: "var(--nav-border)",
          height: "64px"
        }}
      >
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        >
          <img src="/trolley.png" alt="SuperMarket" className="h-8 w-8" />
          <span className="text-xl font-bold">
            Super<span style={{ color: "var(--accent)" }}>Market</span>
          </span>
        </div>

        {/* SEARCH */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/search?q=${searchQuery}`);
            }
          }}
          className="hidden md:flex flex-1 max-w-md mx-4"
        >
          <div className="flex w-full rounded-full overflow-hidden border">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="px-4"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* THEME */}
          <button
            onClick={() => setTheme(getNextTheme())}
            className="p-2 rounded-full"
            style={{ backgroundColor: "var(--accent)", color: "#fff" }}
          >
            {getThemeIcon()}
          </button>

          {/* USER */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                  style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                >
                  {(user?.name?.charAt(0) ||
                    user?.email?.charAt(0) ||
                    "U").toUpperCase()}
                </div>
              </div>

              {open && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl border overflow-hidden"
                  style={{
                    backgroundColor: "var(--dropdown-bg)",
                    borderColor: "var(--nav-border)"
                  }}
                >
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setOpen(false);
                    }}
                    className="w-full px-4 py-3 flex items-center gap-3 text-sm"
                  >
                    <User size={16} /> My Profile
                  </button>

                  <button
                    onClick={logout}
                    className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-500"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              Login / Sign Up
            </button>
          )}

          {/* CART */}
          <div
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 cursor-pointer p-2 rounded-lg"
          >
            <ShoppingCart size={20} />
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

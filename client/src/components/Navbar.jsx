import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const { userData, API_URL, setUserData, setIsLoggedIn } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log("Navbar userData:", userData);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/login");
        toast.success("Logged out successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">

        {/* Brand */}
        <Link to="/" className="text-xl font-black tracking-tight text-white">
          IQ<span className="text-violet-400">orium</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-150"
          >
            Dashboard
          </Link>

          <div className="w-px h-5 bg-slate-700 mx-1" />

          {userData ? (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {/* User Trigger */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer hover:bg-slate-800 transition-colors duration-150">
                <span className="text-lg">👤</span>
                <span className="text-sm font-medium text-slate-300">
                  {userData.firstname + " " + userData.lastname}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-xl shadow-black/40 overflow-hidden">
                  {userData && !userData.isAccountVerified && (
                  <Link
                    to="/verify-email"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-100"
                  >
                    <span className="text-base">✉️</span>
                    Verify Email
                  </Link>)}
                  <Link
                    to="/profile"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-100"
                  >
                    <span className="text-base">👤</span>
                    Profile
                  </Link>
                  <div className="border-t border-slate-800" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors duration-100 border-0 bg-transparent cursor-pointer text-left"
                  >
                    <span className="text-base">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-150"
            >
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
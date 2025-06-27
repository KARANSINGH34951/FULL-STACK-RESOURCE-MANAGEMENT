import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });
        setRole(res.data.role);
      } catch (error) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [location.pathname]);

  if (loading) return null;

  return (
    <nav className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">Event Platform</div>

        <ul className="flex flex-wrap gap-4 items-center text-gray-700 font-medium">
          {!role && (
            <>
              <li>
                <Link to="/" className="hover:text-blue-500 transition">Home</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-500 transition">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-500 transition">Signup</Link>
              </li>
            </>
          )}

          {role === "PLANNER" && (
            <>
              <li>
                <Link to="/planner-dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
              </li>
              <li>
                <Link to="/planner-dashboard/add-event" className="hover:text-blue-500 transition">Add Event</Link>
              </li>
              <li>
                <Link to="/planner-dashboard/add-resource" className="hover:text-blue-500 transition">Add Resource</Link>
              </li>
              <li>
                <Link to="/planner-dashboard/pending-events" className="hover:text-blue-500 transition">Pending Events</Link>
              </li>
              <li>
                <Link
                  to="/planner-dashboard/approved-events"
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Approved Events
                </Link>
              </li>
            </>
          )}

          {role === "STAFF" && (
            <>
              <li>
                <Link to="/staff-dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
              </li>
              <li>
                <Link to="/staff-dashboard/status" className="hover:text-blue-500 transition">Status</Link>
              </li>
              <li>
                <Link to="/staff-dashboard/edit-event" className="hover:text-blue-500 transition">Edit Events</Link>
              </li>
            </>
          )}

          {role === "CLIENT" && (
            <>
              <li>
                <Link to="/client-dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
              </li>
              <li>
                <Link to="/client-dashboard/request" className="hover:text-blue-500 transition">Request Event</Link>
              </li>
              <li>
                <Link
                  to="/client-dashboard/my-events"
                  className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md transition"
                >
                  My Events
                </Link>
              </li>
            </>
          )}

          {role && (
            <li>
              <button
                onClick={async () => {
                  try {
                    await axios.get("http://localhost:5000/api/auth/logout", {
                      withCredentials: true,
                    });
                    localStorage.clear();
                    window.location.href = "/login";
                  } catch (err) {
                    console.error("Logout failed:", err);
                  }
                }}
                className="text-red-500 hover:underline transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

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
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow">
      <div className="font-bold text-xl">Event Platform</div>
      <ul className="flex gap-4">
        {!role && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {role === "PLANNER" && (
          <>
            <li>
              <Link to="/planner-dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/planner-dashboard/add-event">Add Event</Link>
            </li>
            <li>
              <Link to="/planner-dashboard/add-resource">Add Resource</Link>
            </li>
            <li>
              <Link to="/planner-dashboard/allocate-resource">
                Allocate Resource
              </Link>
            </li>
            <li>
              <Link to="/planner-dashboard/pending-events">
                Pending Events
              </Link>
            </li>
             <Link to="/planner-dashboard/approved-events" className="hover:underline text-green-400 font-semibold">
          approved-events
        </Link>
          </>
        )}

        {role === "STAFF" && (
          <>
            <li>
              <Link to="/staff-dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/staff-dashboard/edit-event">Edit Events</Link>
            </li>
          </>
        )}

        {role === "CLIENT" && (
          <>
            <li>
              <Link to="/client-dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/client-dashboard/request">Request Event</Link>
            </li>
            <Link
              to="/client-dashboard/my-events"
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              View My Events
            </Link>
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
              className="text-red-400 hover:underline"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

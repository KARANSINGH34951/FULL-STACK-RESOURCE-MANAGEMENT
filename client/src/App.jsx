import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import PlannerDashboard from "./pages/planner/PlannerDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import Unauthorized from "./pages/Unauthorized";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<PrivateRoute allowedRoles={["PLANNER"]} />}>
          <Route path="/planner-dashboard" element={<PlannerDashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["STAFF"]} />}>
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["CLIENT"]} />}>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from './pages/AuthPage';
import { Toaster } from "react-hot-toast";

import PlannerDashboard from './pages/planner/PlannerDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import ClientDashboard from './pages/client/ClientDashboard';

import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/auth" element={<AuthPage />} />

       
        <Route
          path="/planner/dashboard"
          element={
            <PrivateRoute
              element={PlannerDashboard}
              allowedRoles={["PLANNER"]}
            />
          }
        />
        <Route
          path="/staff/dashboard"
          element={
            <PrivateRoute
              element={StaffDashboard}
              allowedRoles={["STAFF"]}
            />
          }
        />
        <Route
          path="/client/dashboard"
          element={
            <PrivateRoute
              element={ClientDashboard}
              allowedRoles={["CLIENT"]}
            />
          }
        />

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Catch-all 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;

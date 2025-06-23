import { Navigate } from "react-router-dom";
import { getUserRole, isLoggedIn } from "@/utils/auth";

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const isAuth = isLoggedIn();
  const role = getUserRole();

  if (!isAuth) return <Navigate to="/auth" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return <Component />;
};

export default PrivateRoute;

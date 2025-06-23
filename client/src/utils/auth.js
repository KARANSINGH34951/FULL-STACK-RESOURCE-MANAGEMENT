import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const getToken = () => {
  return Cookies.get("token");
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return decoded.role;
  } catch (err) {
    console.error("Invalid token");
    return null;
  }
};

export const isLoggedIn = () => {
  return !!getToken();
};

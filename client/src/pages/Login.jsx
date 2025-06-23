import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const res = await axios.get("http://localhost:5000/api/auth/user", {
        withCredentials: true,
      });
      const { role } = res.data;

      if (role === "PLANNER") navigate("/planner-dashboard");
      else if (role === "STAFF") navigate("/staff-dashboard");
      else if (role === "CLIENT") navigate("/client-dashboard");
      else navigate("/unauthorized");
    } catch (err) {
      const message =
        err.response?.data?.error || "Login failed. Please try again.";
      toast.error(message);
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-8 max-w-md mx-auto space-y-4">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-semibold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;

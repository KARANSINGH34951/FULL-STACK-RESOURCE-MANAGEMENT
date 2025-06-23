import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "CLIENT",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "/api/user/login" : "/api/user/register";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(url, payload);
      alert(res.data.message || `${isLogin ? "Login" : "Signup"} successful!`);
    } catch (err) {
      alert(err.response?.data?.error || `${isLogin ? "Login" : "Signup"} failed`);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Image Panel */}
      <div
        className={`w-1/2 bg-cover bg-center transition-all duration-700 ${
          isLogin ? "order-2" : "order-1"
        }`}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0')",
        }}
      />

      {/* Form Panel */}
      <div
        className={`w-1/2 flex items-center justify-center transition-all duration-700 ${
          isLogin ? "order-1" : "order-2"
        } bg-slate-100`}
      >
        <Card className="w-full max-w-md shadow-xl border">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              {isLogin ? "Login" : "Sign Up"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <Label htmlFor="role">Role</Label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="PLANNER">Planner</option>
                    <option value="STAFF">Staff</option>
                    <option value="CLIENT">Client</option>
                  </select>
                </>
              )}

              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Register"}
              </Button>
            </form>

            <div className="text-center mt-4 text-sm text-gray-600">
              {isLogin ? "New to the web app?" : "Already a user?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                {isLogin ? "Register here" : "Login here"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;  
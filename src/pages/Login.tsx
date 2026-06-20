import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginTypes } from "../types/authTypes";
import toast from "react-hot-toast";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function Login() {
    const inputs = loginTypes.safeParse({
      email,
      password,
    });

    if (!inputs.success) {
      toast.error("Invalid Inputs");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/auth/login`, {
        email,
        password,
      });
      const token = response.data.token;

      localStorage.setItem("token", token);

      toast.success(response.data.message);
      setLoading(false);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      {" "}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {" "}
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back </h1>
        <p className="text-center text-gray-500 mb-8">
          Login to continue to TeamSphere
        </p>
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>

            <div className="mt-2 flex items-center border rounded-lg px-3">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-lg px-3">
              <Lock size={18} className="text-gray-400" />

              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="text-gray-500"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            onClick={Login}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?
          <button
            onClick={() => navigate("/register")}
            className="ml-2 text-black font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

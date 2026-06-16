import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { registerTypes } from "../types/authTypes";
import axios from "axios";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function userRegister() {
    const inputs = registerTypes.safeParse({
      username,
      email,
      password,
    });

    if (!inputs.success) {
      toast.error("Invalid inputs");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/auth/register`, {
        username,
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Create Account </h1>

        <p className="text-center text-gray-500 mb-8">
          Join TeamSphere and start collaborating
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>

            <div className="mt-2 flex items-center border rounded-lg px-3">
              <User size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

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
            onClick={userRegister}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already registered?
          <button
            onClick={() => navigate("/login")}
            className="ml-2 text-black font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

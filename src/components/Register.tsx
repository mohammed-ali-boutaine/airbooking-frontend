import React, { useState } from "react";
import { Mail, Lock, UserPlus, User } from "lucide-react";
import { postRequest } from "../utils/services";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
  // hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // form validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setSuccess("");

    const url = "/register";

    const body = {
      name,
      email,
      password,
    };

    try {
      const response = await postRequest({
        url,
        body,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-50 font-sans">
      <h2 className="text-[var(--primary-color)]  text-2xl font-bold text-center mb-8 ">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
              placeholder="John Doe"
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Success Message */}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center bg-[var(--primary-color)]  hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm hover:shadow-md"
        >
          <UserPlus size={18} className="mr-2" />
          Sign Up
        </button>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

//     try {

     const response = await axios.post("http://127.0.0.1:8000/api/login", {
            email,
            password,
            remember,
          },{
               headers: {
                'Content-Type': 'application/json',
                 },
          });

      console.log(response);
      
      if(response) {
        console.log("Login successful");
      }
//     } catch (error) {
//       console.log(error);
//     }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-50 font-sans">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Email Field */}
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
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
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
              required
            />
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <a className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm hover:shadow-md"
        >
          <LogIn size={18} className="mr-2" />
          Sign In
        </button>

        {/* Sign up link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

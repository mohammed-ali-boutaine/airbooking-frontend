import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import CheckBox from "../../ui/CheckBox";
import axiosInstance from "../../utils/axios";
import { notifySuccess } from "../../utils/toast";
import { useUserStore } from "../../store/useUserStore";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  //
    const setUser = useUserStore( state => state.setUser)
  


  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      const response = await axiosInstance.post("/login", formData);
      const data = response.data;

      // Save token
      localStorage.setItem("token", data.token);

      setUser(data.user,data.token)

      // Notify success
      notifySuccess("Successfully logged in!");

      // Redirect to tournaments page
      navigate("/");
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-[var(--main-border)] border max-w-md mt-10 rounded-2xl mx-auto p-8 bg-white shadow-sm font-sans mb-24">
      <h2 className="text-[var(--primary-color)] text-2xl font-bold mb-4">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password Field */}
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between mb-8">
          <CheckBox
            id="remember"
            name="remember"
            checked={formData.remember}
            label="Remember me"
            onChange={handleChange}
          />
          <a
            href="/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button variant="primary" fullWidth type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Continue"}
          </Button>
        </div>
      </form>

      {/* Error and Success Messages */}

      {/* Sign up link */}
      <div className="text-center mt-6">
        <span className="text-sm text-gray-600">Don't have an account? </span>
        <Link
          to="/register"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;

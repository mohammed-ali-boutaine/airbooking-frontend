import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import CheckBox from "../../ui/CheckBox";

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

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      console.log("Form submitted:", formData);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        setSuccess("");
        // Navigate to the home page or dashboard
      }, 2000);
    } catch (err:any) {
      console.log(err);
      
      setError("Invalid credentials. Please try again.");
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
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-4">{success}</p>}

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

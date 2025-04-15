import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import CheckBox from "../../ui/CheckBox";
import axiosInstance from "../../utils/axios";
import { notifySuccess } from "../../utils/toast";
import { useUserStore } from "../../store/useUserStore";
import { redirectToProvider } from "../../utils/redirect";

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
            // name="remember"
            checked={formData.remember}
            label="Remember me"
            onChange={handleChange}
          />
          {/* <a
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          > */}
            <Link to='/forgot-password'
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800"

            >
            Forgot password?
            </Link>
          {/* </a> */}
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

      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center"></div>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      <div className="mt-4 space-y-3 hover:cursor-pointer">
        <Button
          onClick={() => redirectToProvider("google")}
          variant="social"
          fullWidth
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="-3 0 262 262"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              />
            </svg>
          }
        >
          Continue With
        </Button>

        <Button
          onClick={() => redirectToProvider("facebook")}
          variant="social"
          fullWidth
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 320 512"
            >
              <path
                fill="#1877F2"
                d="M279.14 288l14.22-92.66h-88.91V131.56c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S261.88 0 225.36 0c-73.06 0-121 44.38-121 124.72V195.3H22.89V288h81.47v224h100.2V288z"
              />
            </svg>
          }
        >
          Continue With
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          By signing in or creating an account, you agree with our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Terms & conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Privacy statement
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
// import { Mail, Lock, UserPlus, User } from "lucide-react";
import { postRequest } from "../../utils/services";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { handleApiError } from "../../utils/api";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await postRequest({
        url: "/register",
        body: formData,
      });

      handleRegistrationSuccess(response);
    } catch (error: any) {
      setError(handleApiError(error));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    setError("");
    setSuccess("");
    return true;
  };

  const handleRegistrationSuccess = (response: any) => {
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setSuccess("Registration successful! Redirecting...");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-50 font-sans">
      <h2 className="text-[var(--primary-color)]  text-2xl font-bold text-center mb-8 ">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          label="Username"
          placeholder="your full name here ..."
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          type="email"
          label="Email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          label="Password"
          placeholder="strong password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="mt-6">
          <Button variant="primary" fullWidth type="submit">
            Continue
          </Button>
        </div>
      </form>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      <div className="text-center mt-6">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <Link
          to="/login"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          Log in
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

      <div className="mt-4 space-y-3">
        <Button
          variant="social"
          fullWidth
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
            </svg>
          }
        >
          Continue With
        </Button>

        <Button
          variant="social"
          fullWidth
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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

export default Register;

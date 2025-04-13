import React, { useState } from "react";
// import { Mail, Lock, UserPlus, User } from "lucide-react";
import { postRequest } from "../../utils/services";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { handleApiError } from "../../utils/api";
import { redirectToProvider } from "../../utils/redirect";
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
    <div className="border-[var(--main-border)] border  max-w-md mt-10 mb-10 rounded-2xl mx-auto p-8 bg-white shadow-sm borderfont-sans">
      <h2 className="text-[var(--primary-color)]  text-2xl font-bold mb-8 ">
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
          required
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

      <div className="mt-4 space-y-3 hover:cursor-pointer">
        <Button
        onClick={()=> redirectToProvider('google')}
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
                onClick={()=> redirectToProvider('facebook')}

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

export default Register;

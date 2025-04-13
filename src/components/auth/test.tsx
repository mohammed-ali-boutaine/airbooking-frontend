import React, { useState } from "react";
// import {  Mail, Lock } from "lucide-react";
// import { postRequest } from "../../utils/services";
import {  Link } from "react-router-dom";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
interface LoginFormData {
  email: string;
  password: string;
  remeber?: boolean;
}

const Login: React.FC = () => {

    const [formData, setFormData] = useState<LoginFormData>({
      email: "",
      password: "",
      remeber: false,
    });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(name == "remeber"){
          setFormData({
            ...formData,
            [name]: e.target.checked,
          });
        }else{

          setFormData({
            ...formData,
            [name]: value,
          });
        }
      };


  // const [error, setError] = useState("");
  // const [success, setSuccess] = useState("");
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    // // Form validation
    // if (!email || !password) {
    //   setError("All fields are required.");
    //   return;
    // }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setError("Please enter a valid email address.");
    //   return;
    // }

    // setLoading(true);
    // setError("");
    // setSuccess("");

    // try {
    //   const response = await postRequest({
    //     url: "/login",
    //     body: { email, password, remember },
    //   });

    //   if (response.status === 201 || response.status === 200) {
    //     localStorage.setItem("token", response.data.token);
    //     localStorage.setItem("user", JSON.stringify(response.data.user));
    //     setSuccess("Login successful! Redirecting...");
    //     setTimeout(() => navigate("/"), 2000);
    //   }
    // } catch (err: any) {
    //   setError(
    //     err.response?.data?.message || "Invalid credentials. Please try again."
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="border-[var(--main-border)] border  max-w-md mt-10 mb-10 rounded-2xl mx-auto p-8 bg-white shadow-sm borderfont-sans">
      <h2 className="text-[var(--primary-color)]  text-2xl font-bold mb-8 ">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Email Field */}

        <Input
          name="email"
          type="text"
          label="Username"
          placeholder="your full name here ..."
          value={formData.email}
          onChange={handleChange}
        />

        {/* <div className="mb-5">
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
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-200"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
        </div> */}

        {/* Password Field */}
        <Input
        name="password"
          type="password"
          label="Password"
          placeholder="strong password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Remember Me and Forgot Password */}


        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
          <Input
          name="remeber"
          type="checkbox"
          id="remember"
          label="Remember me"
          htmlFor="remember"
          checked={formData.remeber}
          onChange={handleChange}
        />
          </div>

          <a className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}

        <div className="mt-6">
          <Button variant="primary" fullWidth type="submit">
            Continue
          </Button>
        </div>
        {/* <button
          type="submit"
          className="w-full flex justify-center items-center bg-[var(--primary-color)]  hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-sm hover:shadow-md"
          // disabled={loading}
        >
          Sing in
          {/* {loading ? (
            "Signing In..."
          ) : (
            <>
              <LogIn size={18} className="mr-2" /> Sign In
            </>
          )} 
        </button> */}

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
      </form>

      {/* Error and Success Messages */}
      {/* {error && <p className="text-red-500 text-sm mt-4">{error}</p>} */}
      {/* {success && <p className="text-green-500 text-sm mt-4">{success}</p>} */}
    </div>
  );
};

export default Login;
